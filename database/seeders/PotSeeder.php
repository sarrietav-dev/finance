<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PotSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $pots = [
            [
                "name" => "Savings",
                "target" => 2000,
                "total" => 159,
                "theme" => "#277C78",
                "user_id" => 1
            ],
            [
                "name" => "Concert Ticket",
                "target" => 150,
                "total" => 110,
                "theme" => "#626070",
                "user_id" => 1
            ],
            [
                "name" => "Gift",
                "target" => 150,
                "total" => 110,
                "theme" => "#82C9D7",
                "user_id" => 1
            ],
            [
                "name" => "New Laptop",
                "target" => 1000,
                "total" => 10,
                "theme" => "#F2CDAC",
                "user_id" => 1
            ],
            [
                "name" => "Holiday",
                "target" => 1440,
                "total" => 531,
                "theme" => "#826CB0",
                "user_id" => 1
            ]
        ];

        DB::table('pots')->insert($pots);
    }
}
