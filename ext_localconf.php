<?php

declare(strict_types=1);

use Quellenform\Iconpack\IconpackRegistry;
use TYPO3\CMS\Core\Configuration\ExtensionConfiguration;
use TYPO3\CMS\Core\Utility\ExtensionManagementUtility;
use TYPO3\CMS\Core\Utility\GeneralUtility;

defined('TYPO3') || die();

if (ExtensionManagementUtility::isLoaded('iconpack')) {
    GeneralUtility::makeInstance(IconpackRegistry::class)
        ->registerIconpack(
            'EXT:iconpack_lucide/Configuration/Iconpack/Lucide.yaml',
            GeneralUtility::makeInstance(ExtensionConfiguration::class)
                ->get('iconpack_lucide', 'configFile')
        );
}