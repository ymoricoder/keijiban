<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>仮会員登録</title>
    <link rel="stylesheet" href="css/master.css">
  </head>
  <body>
    <h1>仮会員登録画面</h1>
    <form method="post">
        @if (isset($mail))
        <p class="error">※{{$mail}}</p>
        @elseif (isset($mail_check))
        <p class="error">※{{$mail_check}}</p>
        @elseif (isset($user_check))
        <p class="error">※{{$user_check}}</p>
        @endif
        <p>メールアドレス：<input type="text" name="mail" size="50" value=""></p>
        <input type="submit" name="submit" value="送信">
    </form>
  </body>
</html>
