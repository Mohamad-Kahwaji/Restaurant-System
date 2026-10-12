<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    protected function order(){
        return $this->belongsTo(Order::class);
    }

    protected function meal(){
        return $this->belongsTo(Meal::class);
    }
}