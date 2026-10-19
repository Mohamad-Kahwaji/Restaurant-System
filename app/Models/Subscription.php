<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

class Subscription extends Model
{
    protected $Fillable=[
        'user_id','package_id','start_date','end_date','remining_meals','status'
    ] ;

    public function package(){
        return $this->belongsTo(Package::class);
    }

    public function user(){
        return $this->belongsTo(User::class);
    }
}