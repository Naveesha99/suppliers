<?php

namespace Database\Seeders;

use App\Models\Supplier;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SupplierSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Supplier::create([
            'supplierName' => 'Saman Distributors',
            'contactPerson' => 'Saman Perera',
            'phone' => '0771122334',
        ]);
        
        Supplier::create([
            'supplierName' => 'Kandy Supplies',
            'contactPerson' => 'Ruwan Silva',
            'phone' => '0712233445',
        ]);
        
        Supplier::create([
            'supplierName' => 'Colombo Traders',
            'contactPerson' => 'Tharindu Jayasinghe',
            'phone' => '0773344556',
        ]);
        
        Supplier::create([
            'supplierName' => 'Lanka Imports',
            'contactPerson' => 'Chamath Fernando',
            'phone' => '0714455667',
        ]);
        
        Supplier::create([
            'supplierName' => 'Southern Distributors',
            'contactPerson' => 'Nuwan Wickramasinghe',
            'phone' => '0775566778',
        ]);
        
        Supplier::create([
            'supplierName' => 'Eastern Exports',
            'contactPerson' => 'Ashan Gunawardana',
            'phone' => '0716677889',
        ]);
        
        Supplier::create([
            'supplierName' => 'Western Enterprises',
            'contactPerson' => 'Lasith Ranatunga',
            'phone' => '0777788990',
        ]);
        
        Supplier::create([
            'supplierName' => 'Central Wholesalers',
            'contactPerson' => 'Isuru Karunaratne',
            'phone' => '0718899001',
        ]);
        
        Supplier::create([
            'supplierName' => 'North Lanka Suppliers',
            'contactPerson' => 'Thilina de Silva',
            'phone' => '0779900112',
        ]);
        
        Supplier::create([
            'supplierName' => 'Ceylon Food Supplies',
            'contactPerson' => 'Chandana Weerasinghe',
            'phone' => '0710011223',
        ]);
        
        Supplier::create([
            'supplierName' => 'Islandwide Traders',
            'contactPerson' => 'Udara Liyanage',
            'phone' => '0771122345',
        ]);
        
        Supplier::create([
            'supplierName' => 'Jaffna Imports',
            'contactPerson' => 'Roshan Mahendran',
            'phone' => '0712233456',
        ]);
        
        Supplier::create([
            'supplierName' => 'Galle Supplies',
            'contactPerson' => 'Gayan Abeysekara',
            'phone' => '0773344567',
        ]);
        
        Supplier::create([
            'supplierName' => 'Matara Traders',
            'contactPerson' => 'Heshan Senanayake',
            'phone' => '0714455678',
        ]);
        
        Supplier::create([
            'supplierName' => 'Kurunegala Distributors',
            'contactPerson' => 'Anura Dissanayake',
            'phone' => '0775566789',
        ]);
        
        Supplier::create([
            'supplierName' => 'Anuradhapura Supplies',
            'contactPerson' => 'Sujeewa Herath',
            'phone' => '0716677890',
        ]);
        
        Supplier::create([
            'supplierName' => 'Polonnaruwa Traders',
            'contactPerson' => 'Janith Rathnayake',
            'phone' => '0777788901',
        ]);
        
        Supplier::create([
            'supplierName' => 'Ratnapura Wholesalers',
            'contactPerson' => 'Nadeesha Kulasekara',
            'phone' => '0718899012',
        ]);
        
        Supplier::create([
            'supplierName' => 'Badulla Enterprises',
            'contactPerson' => 'Kasun Wijesinghe',
            'phone' => '0779900123',
        ]);
        
        Supplier::create([
            'supplierName' => 'Trinco Supplies',
            'contactPerson' => 'Ranga Jayawardana',
            'phone' => '0710011234',
        ]);
        
    }
}
