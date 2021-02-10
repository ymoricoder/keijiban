<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
          $table->increments('id');
          $table->string('urltoken',128)->uniqe();
          $table->string('mail', 191)->uniqe();
          $table->dateTime('date');
          $table->string('name')->nullable();
          $table->string('password')->nullable();
          $table->dateTime("created_at")->nullable();
          $table->dateTime("updated_at")->nullable();
          $table->tinyInteger("flag")->default(0);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
