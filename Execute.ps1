param(
        [string]$rooturl = $(Read-Host -prompt "Enter the Site Collection URL...?")
     )

$invocation = (Get-Variable MyInvocation).Value 
$directoryPath = Split-Path $invocation.MyCommand.Path 

Add-PSSnapin "Microsoft.SharePoint.PowerShell" 

Try
{
    Write-Host "Activating Publishing feature"
    $siteCollection = Get-SPSite $rooturl
    Write-Host "Activating site scoped Publishing feature"
    Enable-SPFeature "PublishingSite" -Url $siteCollection.Url -force
    Write-Host "Site scoped Publishing feature activated"
    Write-Host "Activating web scoped Publishing feature"
    Enable-SPFeature "PublishingWeb" -Url $siteCollection.Url -force
    Write-Host "Web scoped Publishing feature activated"
}
Catch
{
    Write-Host "Publishing feature is already activated"
}

#Create Site Columns
Write-Host "Started CreateSiteColumns.ps1"
$Path_createSiteColumns= $directoryPath +"\1. Create Site Columns\CreateSiteColumns.ps1"
& $Path_createSiteColumns $rooturl
Write-Host "CreateSiteColumns.ps1 Completed"

#Create Content Types
Write-Host "Started CreateContentTypes.ps1"
$Path_createContentTypes= $directoryPath +"\2. Content Types\CreateContentTypes.ps1"
& $Path_createContentTypes $rooturl
Write-Host "CreateContentTypes.ps1 Completed"

#Create Lists
Write-Host "Started CreateLists.ps1"
$Path_createLists= $directoryPath +"\3. Create List\CreateLists.ps1"
& $Path_createLists $rooturl
Write-Host "CreateLists.ps1 Completed"

#Create List based on Template
Write-Host "Started CreateListBasedOnTemplate.ps1"
$Path_createLists= $directoryPath +"\3.1. List Template\CreateListBasedOnTemplate.ps1"
& $Path_createLists $rooturl
Write-Host "CreateListBasedOnTemplate.ps1 Completed"

#Create List Items
Write-Host "Started CreateItems.ps1"
$Path_createListItems= $directoryPath +"\4. Create List Items\CreateItems.ps1"
& $Path_createListItems $rooturl
Write-Host "CreateItems.ps1 Completed"

#Upload Files 
Write-Host "Started UploadFiles.ps1"
$Path_uploadFiles= $directoryPath +"\5. Files\UploadFiles.ps1"
& $Path_uploadFiles $rooturl
Write-Host "UploadFiles.ps1 Completed"

#Upload Master Page
Write-Host "Started UploadMasterPages.ps1"
$Path_uploadMasterPage= $directoryPath +"\6. Upload Master Page\UploadMasterPages.ps1"
& $Path_uploadMasterPage $rooturl
Write-Host "UploadMasterPages.ps1 Completed"

#Upload WebParts
Write-Host "Started UploadWebParts.ps1"
$Path_UploadWebParts= $directoryPath +"\7. Create Pages\UploadWebParts.ps1"
& $Path_UploadWebParts $rooturl
Write-Host "UploadWebParts.ps1 Completed"

#Create Pages
Write-Host "Started CreatePages.ps1"
$Path_CreatePages= $directoryPath +"\7. Create Pages\CreatePages.ps1"
& $Path_CreatePages $rooturl
Write-Host "CreatePages.ps1 Completed"

#Configuration
Write-Host "Started Configuration.ps1"
$Path_Configuration= $directoryPath +"\8. Configuration\Configuration.ps1"
& $Path_Configuration $rooturl
Write-Host "Configuration.ps1 Completed"