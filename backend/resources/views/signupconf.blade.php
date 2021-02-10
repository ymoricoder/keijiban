<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>本登録確認画面</title>
    <link rel="stylesheet" href="comn/master.css">
  </head>
  <body>
    <h1>本登録確認画面</h1>

    <form method="post">
      <p>メールアドレス：{{$mail}}</p>
      <p>パスワード：{{$password_hide}}</p>
      <p>氏名：{{$name}}</p>

      <input type="hidden" name="mail" value="{{$mail}}">
      <input type="hidden" name="name" value="{{$name}}">
      <input type="hidden" name="password" value="{{$password}}">
      <input type="submit" name="btn_back" value="戻る">
      <input type="submit" name="btn_submit" value="登録する">
    </form>
  </body>
</html>
