<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\FoodsResource;
use App\Models\Food;
use Illuminate\Http\Request;

class FoodController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $foods = Food::all();

        return FoodsResource::collection($foods);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $food = Food::create($request->all());

        return new FoodsResource($food);
    }

    /**
     * Display the specified resource.
     */
    public function show(Food $food)
    {
        return new FoodsResource($food);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Food $food)
    {
        $food->update($request->all());
        return new FoodsResource($food);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Food $food)
    {
        Food::destroy($food->id);
    }
}
