<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class logController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function logIn(Request $req)
    {
      $message = [];

      if($req->input('submit') !== null){

        $mail = $req->input('mail');
        $password = $req->input('password');

        $definedpassword = DB::table('users')->where('mail', $mail)->value('password');
        $definedname = DB::table('users')->where('mail', $mail)->value('name');

        if($mail == "" || $password == ""){

          $message['empty'] = "メールアドレスとパスワードを入力してください。";

        }  else if (strcmp($definedpassword, $password) == 0) {
          setcookie('name', $definedname, time()+24*60*60);
          setcookie('password', $definedpassword, time()+24*60*60);

          header('Location: /');
          exit();

        } else {

          $message['wrong'] = "メールアドレスまたはパスワードが間違っています。";
        }
      }

      return view('/login', $message);
    }
    //
}
