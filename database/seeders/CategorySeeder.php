<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
  private array $categories;

  public function __construct()
  {
    $this->categories = $this->loadData();
  }

  private function loadData()
  {
    return require 'data/categories.php';
  }

  public function run(): void
  {

    foreach ($this->categories as $category) {
      Category::create([
        'name' => $category['name']
      ]);
    }
  }
}
