
``` sql

CREATE OR REPLACE PACKAGE pkg_update_salary IS
    TYPE emp_id_array IS TABLE OF EMPLOYEES.EMPLOYEE_ID%TYPE INDEX BY PLS_INTEGER;
    TYPE salary_array IS TABLE OF EMPLOYEES.SALARY%TYPE INDEX BY PLS_INTEGER;
    TYPE error_code_array IS TABLE OF NUMBER INDEX BY PLS_INTEGER;
    TYPE error_msg_array IS TABLE OF VARCHAR2(4000) INDEX BY PLS_INTEGER;

    PROCEDURE update_salaries(
        p_emp_ids     IN  emp_id_array,
        p_salaries    IN  salary_array,
        o_err_codes   OUT error_code_array,
        o_err_msgs    OUT error_msg_array
    );
END pkg_update_salary;
/

CREATE OR REPLACE PACKAGE BODY pkg_update_salary IS
    PROCEDURE update_salaries(
        p_emp_ids     IN  emp_id_array,
        p_salaries    IN  salary_array,
        o_err_codes   OUT error_code_array,
        o_err_msgs    OUT error_msg_array
    ) IS
        v_salary EMPLOYEES.SALARY%TYPE;
        v_err_index PLS_INTEGER := 0;
    BEGIN
        FOR i IN p_emp_ids.FIRST .. p_emp_ids.LAST LOOP
            BEGIN
                -- 排他ロックを取得
                SELECT SALARY
                INTO v_salary
                FROM EMPLOYEES
                WHERE EMPLOYEE_ID = p_emp_ids(i)
                FOR UPDATE NOWAIT;

                -- 更新処理
                UPDATE EMPLOYEES
                SET SALARY = p_salaries(i)
                WHERE EMPLOYEE_ID = p_emp_ids(i);

                COMMIT;

            

EXCEPTION
                WHEN NO_DATA_FOUND THEN
                    v_err_index := v_err_index + 1;
                    o_err_codes(v_err_index) := 1001;
                    o_err_msgs(v_err_index) := 'IDが存在しません: ' || p_emp_ids(i);
                    ROLLBACK;

                WHEN OTHERS THEN
                    v_err_index := v_err_index + 1;
                    o_err_codes(v_err_index) := SQLCODE;

                    IF SQLCODE = -54 THEN
                        o_err_msgs(v_err_index) := 'ロック中のためスキップ: ' || p_emp_ids(i);
                    ELSE
                        o_err_msgs(v_err_index) := 'エラー (' || SQLERRM || ') - ID: ' || p_emp_ids(i);
                    END IF;

                    ROLLBACK;
            END;
        END LOOP;
    END update_salaries;
END pkg_update_salary;
/

```

``` sql

CREATE OR REPLACE PROCEDURE update_with_lock_proc (
    p_id         IN  NUMBER,      -- 対象レコードのID
    p_old_value  IN  VARCHAR2,    -- 現在の期待値
    p_new_value  IN  VARCHAR2,    -- 更新後の値
    p_result     OUT NUMBER       -- 戻り値（1:更新成功, 0:一致せず, -1:例外）
)


CREATE OR REPLACE PROCEDURE update_with_lock_proc (
    p_id         IN  NUMBER,
    p_old_value  IN  VARCHAR2,
    p_new_value  IN  VARCHAR2,
    p_result     OUT NUMBER
)
IS
    v_dummy      VARCHAR2(1);  -- ロック確認用
BEGIN
    -- ロック確認
    SELECT 'X'
    INTO v_dummy
    FROM your_table
    WHERE id = p_id
    FOR UPDATE NOWAIT;

    -- 更新処理
    UPDATE your_table
    SET column_value = p_new_value
    WHERE id = p_id
      AND column_value = p_old_value;

    -- 結果設定（更新件数が 0 でもコミットする）
    IF SQL%ROWCOUNT = 0 THEN
        p_result := 0;  -- 値が一致しなかった
    ELSE
        p_result := 1;  -- 更新成功
    END IF;

    COMMIT;

EXCEPTION
    WHEN OTHERS THEN
        p_result := -1;
        ROLLBACK;

        INSERT INTO error_log (
            error_time, error_message, procedure_name
        ) VALUES (
            SYSDATE, SQLERRM, 'update_with_lock_proc'
        );
END;

```
CREATE OR REPLACE PROCEDURE update_with_lock_proc (
    p_id         IN  NUMBER,      -- 対象レコードのID
    p_old_value  IN  VARCHAR2,    -- 現在の期待値
    p_new_value  IN  VARCHAR2,    -- 更新後の値
    p_result     OUT NUMBER       -- 戻り値（1:更新成功, 0:一致せず, -1:例外）
)

```sql
CREATE OR REPLACE PROCEDURE update_with_lock_proc (
    p_id         IN  NUMBER,
    p_old_value  IN  VARCHAR2,
    p_new_value  IN  VARCHAR2,
    p_result     OUT NUMBER
)
IS
    v_dummy VARCHAR2(1);
BEGIN
    -- ロック確認
    SELECT 'X'
    INTO v_dummy
    FROM your_table
    WHERE id = p_id
    FOR UPDATE NOWAIT;

    -- 更新処理
    UPDATE your_table
    SET column_value = p_new_value
    WHERE id = p_id
      AND column_value = p_old_value;

    -- 戻り値設定
    IF SQL%ROWCOUNT = 0 THEN
        p_result := 0;
    ELSE
        p_result := 1;
    END IF;

    COMMIT;

EXCEPTION
    WHEN OTHERS THEN
        p_result := -1;
        ROLLBACK;

        INSERT INTO error_log (
            error_time, error_message, procedure_name
        ) VALUES (
            SYSDATE, SQLERRM, 'update_with_lock_proc'
        );
END;
```





