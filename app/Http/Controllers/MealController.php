<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Meal;
class MealController extends Controller
{
    public function index(){
        $meal = Meal::all();
        return ;
    }
    public function store(Request $request){
        $validatedData =  $request->validate([
            'name'=>'required|string|max:255',
            'description'=>'nullable|string',
            'image'=>'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'available_date'=>'required|date'
        ]);

        IF($request->hasfile('image'))
        {
            $imagepath = $request->file('image')->store('meals', 'public');
            $validatedData['image'] = $imagepath;
        }

        Meal::create($validatedData);

        return redirect()->back()->with('message', 'seccessfully created');
    }


    public function create(){
        return ;
    }

    public function update($id, Request $request){
        $meal = Meal::findOrFail($id);

        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'available_date' => 'required|date'
        ]);
        if ($request->hasFile('image')) {
            // حذف الصورة القديمة إن وُجدت
            if ($meal->image) {
                Storage::disk('public')->delete($meal->image);
            }
            // حفظ الصورة الجديدة
            $imagePath = $request->file('image')->store('meals', 'public');
            $validatedData['image'] = $imagePath;
        }
        $meal::update($validatedData);
        return redirect()->back()->with('message','seccessfully updated');
    }

    public function edite($id){
        $meal = Meal::findOrFail($id);
        return ;
    }

    public function destroy($meal){
        Meal::findOrFail($meal)->delete();
        return redirect()->back()->with('message', 'seccessfully deleted');
    }


}
