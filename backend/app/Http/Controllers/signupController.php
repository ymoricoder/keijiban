<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class signupController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function signupMail(Request $req)
    {
        $errors = array();

        if (empty($req->input('mail'))) {
            $errors['mail'] = 'メールアドレスが未入力です。';
        } else {
            $mail = $req->input('mail');

            if (!preg_match("/^([a-zA-Z0-9])+([a-zA-Z0-9\._-])*@([a-zA-Z0-9_-])+([a-zA-Z0-9\._-]+)+$/", $mail)) {
                $errors['mail_check'] = "メールアドレスの形式が正しくありません。";
            }
            //入力されたメールアドレスでidを検索
            $id = DB::select('select id from users where mail = ?', [$mail]);
            //idが存在した場合usersテーブルにメールアドレスがすでに存在しているということになる。
            if (!empty($id)) {
                $errors['user_check'] = "このメールアドレスはすでに利用されています。";
            }
        }
        //エラーがない場合usersテーブルにインサート
        if (count($errors) === 0) {
            $urltoken = hash('sha256', uniqid(rand(), 1));
            $url = "http://localhost:8000/signup?urltoken=".$urltoken;
            $test['url'] = $url;
            //データベースに登録

            DB::insert('insert into users (urltoken, mail, date) value (?, ?, ?)', [$urltoken, $mail, date('Y-m-d H:i:s')]);
            $message = "メールをお送りしました。24時間以内にメールに記載されたURLからご登録ください。";

            $to = $mail;
            $subject = "本登録のお知らせ";
            $body = "こちらのURLから本登録をお済ませください。\n".$url;
            $headers = "From:keijiban@example.com";
        }

        if (count($errors) === 0) {
            return view('signup_mailcomp', $test);
        } else {
            return view('signup_mailform', $errors);
        }
    }
    public function signup(Request $req)
    {
        $data['errors'] = array();

        //formのプログラム
        if (empty($_GET)) {
            header("Location: /signup_mail");
            exit();
        } else {
            //GETデータを変数に入れる
            $urltoken = $req->input('urltoken'); //urlの文字列から読み取り

            //メール入力判定
            if ($urltoken == '') {
                $data['errors']['urltoken'] = "トークンがありません。";
            } else {
                // DB接続
                //flagが0の未登録者 or 仮登録日から24時間以内
                $tokenConfirm = DB::table('users')->whereRaw('urltoken = ? AND flag =0 AND date > now() - interval 24 hour', [$urltoken])->get();
                //$tokenConfirm = DB::selectRaw('SELECT mail FROM user WHERE urltoken=? AND flag =0 AND date > now() - interval 24 hour', [$urltoken]);

                //レコード件数取得
                $row_count = count($tokenConfirm);

                //24時間以内に仮登録され、本登録されていないトークンの場合
                if ($row_count === 1) {
                    $data['mail'] = DB::table('users')->where('urltoken', $urltoken)->value('mail');
                } else {
                    $data['errors']['urltoken_timeover'] = "このURLはご利用できません。有効期限が過ぎたかURLが間違えている可能性がございます。もう一度登録をやりなおして下さい。";
                }
            }
        }

        //signupconfのプログラム
        if ($req->has('btn_confirm')) {
            if (empty($_POST)) {
                header("Location: signup_mail.php");
                exit();
            } else {
                //POSTされたデータを各変数に入れる
                $confirm['mail'] = $req->input('mail');
                $confirm['name'] = $req->input('name');
                $confirm['password'] = $req->input('password');

                //アカウント入力判定
                //パスワード入力判定
                if ($confirm['password'] == ''):
                  $data['errors']['password'] = "パスワードが入力されていません。";
                else:
                  $confirm['password_hide'] = str_repeat('*', strlen($confirm['password']));
                endif;

                if ($confirm['name'] == ''):
                  $data['errors']['name'] = "氏名が入力されていません。";
                endif;
            }
        }

        //signupcompのプログラム
        if ($req->input('btn_submit') !== null) {
            //パスワードのハッシュ化
            $mail = $req->input('mail');
            $name = $req->input('name');
            $password =  $req->input('password');

            //ここでデータベースに登録する
            DB::update('update users set name=?, password=? where mail=?', [$name, $password, $mail]);

            DB::update('update users set flag=1 where mail = ?', [$mail]);

                /*
                * 登録ユーザと管理者へ仮登録されたメール送信
       */
                /*
                        $mailTo = $mail.','.$companymail;
                       $body = <<< EOM
                       この度はご登録いただきありがとうございます。
                        本登録致しました。
                EOM;
                       mb_language('ja');
                       mb_internal_encoding('UTF-8');

                       //Fromヘッダーを作成
                       $header = 'From: ' . mb_encode_mimeheader($companyname). ' <' . $companymail. '>';

                       if(mb_send_mail($mailTo, $registation_mail_subject, $body, $header, '-f'. $companymail)){
                           $message['success'] = "会員登録しました";
                       }else{
                           $errors['mail_error'] = "メールの送信に失敗しました。";
                        }
                */
                //データベース接続切断
        }


        if ($req->has('btn_submit') && count($data['errors']) === 0) {
          return view('signupcomp');
        } elseif ($req->has('btn_confirm') && count($data['errors']) === 0) {
          return view('signupconf', $confirm);
        } else {
          return view('signupform', $data);
        }
    }

    //
}
