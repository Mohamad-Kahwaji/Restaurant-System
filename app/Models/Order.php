<?php

namespace App\Models;

use AddressInfo;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected function user(){
        return $this->belongsTo(User::class);
    }

    protected function address(){
        return $this->belongsTo(Address::class);
    }

    protected function item(){
        return $this->hasMany(OrderItem::class);
    }
}
