<?php

declare(strict_types=1);


$EM_CONF[$_EXTKEY] = [
    'title' => 'Iconpack: Lucide Icons',
    'description' => 'This Extension registers an Iconpack-Provider for EXT:iconpack which allows you to use the "Lucide Icons" in TYPO3.',
    'category' => 'fe',
    'state' => 'stable',
    'clearcacheonload' => true,
    'author' => 'Tobias Quadflieg',
    'author_email' => 'quadflieg@ppam.de',
    'author_company' => 'PPAM.de',
    'version' => '1.0',
    'constraints' => [
        'depends' => [
            'typo3' => '10.4.11-14.9.99',
            'iconpack' => '0.2.0-1.99'
        ],
        'conflicts' => [],
        'suggests' => []
    ]
];