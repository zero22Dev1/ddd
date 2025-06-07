Public Class Form1
    Inherits Form

    Private currentBorderColor As Color = Color.Blue ' 初期は青

    Public Sub New()
        InitializeComponent()
        Me.Size = New Size(800, 1280)
        Me.FormBorderStyle = FormBorderStyle.None
        Me.Padding = New Padding(5)
        Me.StartPosition = FormStartPosition.CenterScreen
    End Sub

    ' 通知を受け取って枠線の色を変更
    Public Sub SetStatus(status As String)
        Select Case status.ToLower()
            Case "normal"
                currentBorderColor = Color.Blue
            Case "error"
                currentBorderColor = Color.Red
            Case Else
                currentBorderColor = Color.Gray ' 不明な状態
        End Select

        Me.Invalidate() ' 再描画
    End Sub

    ' 枠線描画
    Protected Overrides Sub OnPaint(e As PaintEventArgs)
        MyBase.OnPaint(e)
        Using pen As New Pen(currentBorderColor, 5)
            e.Graphics.DrawRectangle(pen, 0, 0, Me.ClientSize.Width - 1, Me.ClientSize.Height - 1)
        End Using
    End Sub
End Class