## Todo-List
https://monaski.hatenablog.com/entry/2018/07/12/214217


Imports System.Diagnostics

Private Sub ShowKeyboard()
    Try
        Process.Start("osk.exe")
    Catch ex As Exception
        MessageBox.Show("スクリーンキーボードを起動できません。" & vbCrLf & ex.Message)
    End Try
End Sub

Private Sub btnKeyboard_Click(sender As Object, e As EventArgs) Handles btnKeyboard.Click
    ShowKeyboard()
End Sub





https://monaski.hatenablog.com/entry/2018/07/12/234948