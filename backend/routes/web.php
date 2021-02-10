<?php

/** @var \Laravel\Lumen\Routing\Router $router */

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
    return $router->app->version();
});
$router->get('/', function(){
  return view('index');
});
$router->get('/readData','indexController@readData');
$router->post('/','indexController@writeData');
$router->post('/deleteData','indexController@deleteData');
$router->post('/editData','indexController@editData');
$router->get('/login','logController@logIn');
$router->post('/login','logController@logIn');
$router->get('/logout',function(){
  return view('logout');
});
$router->get('/signup_mail', function(){
  return view('signup_mailform');
});
$router->post('/signup_mail', "signupController@signupMail");
$router->get('/signup','signupController@signup');
$router->post('/signup','signupController@signup');


$router->get('/timezone', function(){
  return view('timezone');
});
