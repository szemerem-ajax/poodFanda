<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CourierAssignment extends Model
{
    protected $table = "courier_assignments";

    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class, 'orderid', 'id');
    }

    public function courier(): BelongsTo
    {
        return $this->belongsTo(User::class, 'courierid', 'id');
    }
}
