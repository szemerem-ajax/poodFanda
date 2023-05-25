<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Food;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FoodController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $foods = Food::all()
            ->load(['restaurant', 'categories']);

        return JsonResource::collection($foods);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $food = Food::create([
            'name' => $request->name,
            'description' => $request->description,
            'price' => $request->price,
            'image_url' => $request->image_url,
            'restaurantid' => $request->query('restaurantid')
        ]);

        foreach ($request['categories'] as $cat)
        {
            $food->categories()->attach($cat);
        }
        $food->save();

        return new JsonResource($food);
    }

    /**
     * Display the specified resource.
     */
    public function show(Food $food)
    {
        return new JsonResource($food);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Food $food)
    {
        // $food->update($request->all());
        $food->name = $request->name;
        $food->description = $request->description;
        $food->price = $request->price;
        $food->image_url = $request->image_url;

        $food->categories()->detach();
        foreach ($request['categories'] as $cat)
        {
            $food->categories()->attach($cat);
        }
        $food->save();

        return new JsonResource($food);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Food $food)
    {
        Food::destroy($food->id);
    }
}
