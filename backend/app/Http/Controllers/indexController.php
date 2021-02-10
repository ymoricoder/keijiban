<?php
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use App\Models\User;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class indexController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function readData()
    {
      $data['comments'] = DB::select('select * from comments');
      return response()->json($data);
    }
    public function writeData(Request $req)
    {
      $name = $req->input('name');
      $contents = $req->input('contents');
      $date = date("Y-m-d h:i:s");
      $password = $req->input('password');

      if($req->hasFile('upfile')){
        $fileName = date('YmdGis');
        $extension = $req->file('upfile')->getClientOriginalExtension();

        if(strcmp($extension,"jpg") == 0 or strcmp($extension,"jpeg") == 0 or strcmp($extension,"JPG") == 0 or strcmp($extension,"JPEG") == 0){
            $extension = "jpg";
        } else if (strcmp($extension,"png") == 0 or strcmp($extension,"PNG") == 0 ){
            $extension = "png";
        } else if (strcmp($extension,"gif") == 0 or strcmp($extension,"GIF") == 0 ){
            $extension = "gif";
        } else if (strcmp($extension,"mp4") == 0 or strcmp($extension,"MP4") == 0 ){
            $extension = "mp4";
        }

        $fileNameExtension = $fileName.'.'.$extension;
        $req->file('upfile')->move('media', $fileNameExtension);

        DB::insert('insert into comments (name, contents, date, password, fname, extension) values (?, ?, ?, ?, ?, ?)', [$name, $contents, $date, $password, $fileName, $extension]);

      } else {

        DB::insert('insert into comments (name, contents, date, password) values (?, ?, ?, ?)', [$name, $contents, $date, $password]);

      }

      $data['comments'] = DB::select('select * from comments');
      return response()->json($data);
    }
    public function deleteData(Request $req)
    {
      $deleteNumber = $req->input('deleteNumber');
      $delete = DB::delete('delete from comments where id= ? ', [$deleteNumber]);

      $data['comments'] = DB::select('select * from comments');
      return response()->json($data);
    }
    public function editData(Request $req)
    {
      $editNumber = $req->input('id');
      $editName = $req->input('name');
      $editContents = $req->input('contents');
      $edit = DB::update('update comments set name=?, contents=? where id=?', [$editName, $editContents, $editNumber]);

      $data['comments'] = DB::select('select * from comments');
      return response()->json($data);
    }
    //
}
