<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>ログインページ</title>
    <link rel="stylesheet" href="css/master.css">
  </head>
  <body>
    <h1>ログイン</h1>
    <form method="post">
      @if (isset($empty))
      <p class="error">※{{$empty}}</p>
      @elseif (isset($wrong))
      <p class="error">※{{$wrong}}</p>
      @endif
      <p>メールアドレス</p><input type="text" name="mail"><br>
      <p>パスワード</p><input type="password" name="password"><br>
      <input type="submit" name="submit" value="ログイン" style="margin-top:20px;">
    </form>
    <br><br>
    <a href="/signup_mail">アカウントを新規作成する。</a>
  </body>
</html>
