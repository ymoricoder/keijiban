<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>本登録入力画面</title>
    <link rel="stylesheet" href="css/master.css">
  </head>
  <body id="user">
    <h1>会員登録画面</h1>
    @if (isset($errors))
    @foreach ($errors as $error)
    <p class="error">{{$error}}</p>
    @endforeach
    @endif

    @if (!isset($urltoken_timeover))
    <form method="post">
      <p>メールアドレス：{{$mail}}</p>
      <input type="hidden" name="mail" value={{$mail}}>
      <p>パスワード：<input type="password" name="password"></p>
      <p>氏名：<input type="text" name="name"></p>
      <input type="submit" name="btn_confirm" value="確認する">
    </form>
    @endif
  </body>
</html>
