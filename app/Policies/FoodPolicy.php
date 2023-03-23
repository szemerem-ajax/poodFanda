<?php

namespace App\Policies;

use App\Models\Food;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class FoodPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(?User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(?User $user, Food $food): bool
    {
        return true;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user, Food $food): bool
    {
        return $user->is_restaurant() && $user->id === $food->restaurantid;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Food $food): bool
    {
        return $user->is_restaurant() && $user->id === $food->restaurantid;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Food $food): bool
    {
        return $user->is_restaurant() && $user->id === $food->restaurantid;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Food $food): bool
    {
        return $user->is_restaurant() && $user->id === $food->restaurantid;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Food $food): bool
    {
        return $user->is_restaurant() && $user->id === $food->restaurantid;
    }
}
