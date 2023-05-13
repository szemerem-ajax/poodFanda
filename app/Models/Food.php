<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Food extends Model
{
    protected $table = "foods";

    protected $fillable = [
        'name',
        'description',
        'price'
    ];

    public function restaurant(): BelongsTo
    {
        return $this->belongsTo(User::class, 'restaurantid', 'id');
    }

    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(Category::class, 'foodscategories', 'foodid', 'categoryid');
    }
}
