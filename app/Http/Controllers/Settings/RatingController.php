<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class RatingController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index(Request $request)
  {
    $page = $request->query('target');

    return match ($page) {
      'breakdown' => inertia('settings/provider/reviews/breakdown', [
        'target' => $page
      ]),
      default => inertia('settings/provider/reviews/index', [
        'target' => $page
      ]),
    };
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(Request $request)
  {
    //
  }

  /**
   * Display the specified resource.
   */
  public function show(string $id)
  {
    return inertia('settings/provider/reviews/show', [
      'reviews' => [
        [
          'id' => 1,
          'client' => 'Ama K.',
          'rating' => 5,
          'service' => 'Signature facial',
          'comment' =>
            'The team is so welcoming and the result was exactly what I wanted. I will definitely be back.',
          'date' => '2 weeks ago',
        ],
        [
          'id' => 2,
          'client' => 'Nana B.',
          'rating' => 5,
          'service' => 'Deep tissue massage',
          'comment' =>
            'Beautiful space, easy booking and genuinely thoughtful service from start to finish.',
          'date' => '1 month ago',
        ],
        [
          'id' => 3,
          'client' => 'Esi A.',
          'rating' => 4,
          'service' => 'Glow treatment',
          'comment' =>
            'A lovely experience. The staff listened carefully and gave me helpful aftercare advice.',
          'date' => '1 month ago',
        ],
      ]
    ]);
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, string $id)
  {
    //
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(string $id)
  {
    //
  }
}
