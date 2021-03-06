
 param(
 #[string]$uploadurl = $(Read-Host -prompt "Enter the Folder"),
 [string]$path = $(Read-Host -prompt "Enter Web Application Root URL")
)


Add-PSSnapin "Microsoft.SharePoint.PowerShell"

function Copy-FilestoSP
{
    Param (
           [parameter(Mandatory=$true)][string]$LocalPath, 
           [parameter(Mandatory=$true)][string]$SiteUrl, 
           [parameter(Mandatory=$true)][string]$Library, 
           [parameter(Mandatory=$false)][switch]$CheckIn,
           [parameter(Mandatory=$false)][switch]$Overwrite,
           [parameter(Mandatory=$false)][string]$LibraryStartFolder, 
           [parameter(Mandatory=$false)][string]$ManifestFilePath, 
           [parameter(Mandatory=$false)][switch]$IncludeSubFolders,
           [parameter(Mandatory=$false)][switch]$Approve,                      
           [parameter(Mandatory=$false)][switch]$FlattenStructure
           )
    
    try
    {
    $IncludeSubFolders = $true;
    $Overwrite = $true;
    $CheckIn = $true
           
    #Get web and document library objects
    $web = Get-SPWeb $SiteUrl
    $docLibrary = $web.Lists[$Library]
    
    #Load metadata manifest file, if specified
    if ($PSBoundParameters.ContainsKey('ManifestFilePath')) {    
        $metadataManifest = [xml] (Get-Content ($ManifestFilePath))
    }
    else
    {
        write-host "Manifest file not specified for categorising uploaded documents"
    }
    
    #Check for the LibraryStartFolder parameter to specify a root folder
    if ($PSBoundParameters.ContainsKey('LibraryStartFolder')) {
        $folder = $web.GetFolder($docLibrary.Title + $LibraryStartFolder)
    }
    else
    {
        $folder = $docLibrary.RootFolder
    }
        
    #Attach to local folder and enumerate through all files
    if($IncludeSubFolders) {
        $files = Get-ChildItem $LocalPath -Recurse
    }
    else
    {
        $files = Get-ChildItem $LocalPath
    }
        
    $files | ForEach-Object {
    
        #Check if the object is a folder - if so, create it in doc library
        if ($_.PSIsContainer) {
            if (($IncludeSubFolders) -and (!$FlattenStructure)) {
                #Generate folder path for creation in SharePoint
                #by looking at the parent folder on the local path
                $spFolderPath = ($_.Parent.FullName.Replace($LocalPath,"")).Replace("\","/")
                
                #Get the folder into which the new folder will be created
                #by adding the folder path generated above, if one existed
                if ($spFolderPath -eq "") {
                    $currentFolder = $web.GetFolder($folder.Url)
                }
                else
                {
                    $currentFolder = $web.GetFolder($folder.Url + $spFolderPath)
                }
                
                #Check to see if subfolder already exists
                #and create it if not
                $testFolder = $currentFolder.SubFolders[$_.Name]
                if ($testFolder -eq $null) {
                    write-host "`nAdding folder" $_.Name "to" $docLibrary.Title "in" $web.Title "..." -foregroundcolor Green
                    $newFolder = $currentFolder.SubFolders.Add($_.Name)
                }
                else
                {
                    write-host "`nFolder" $_.Name "already exists in" $docLibrary.Title "and shall not be created" -foregroundcolor White
                }
            }
        }
        else
        {   
            #Generate file path for upload into SharePoint
            if ($FlattenStructure) {
                $spFilePath = ("/" + $_.Name)
            }
            else
            {
                $spFilePath = ($_.FullName.Replace($LocalPath,"")).Replace("\","/")
            }
            
            $spFullPath = $folder.Url + $spFilePath
            
            #Check if the file exists and the overwrite option is selected before adding the file
            if ((!$web.GetFile($spFullPath).Exists) -or ($Overwrite)) {
                #Add file
                write-host "`nCopying" $_.Name "to" $spFullPath.Replace("/" + $_.Name,"") "in" $web.Title "..." -foregroundcolor Green
                Write-Host $spFullPath
                try{ $web.GetFile($spFullPath).CheckOut() }
                catch { Write-Host "New File Upload" }

                $spFile = $folder.Files.Add($spFullPath, $_.OpenRead(), $true)
                $spItem = $spFile.Item
        
                #Walk through manifest XML file and configure column values on the file
                $metadataManifest.Columns.Column | ForEach-Object {
                    
                    #Single value text columns
                    try
                    {
                        if (($_.Type -eq "Text") -or
                            ($_.Type -eq "Choice") -or
                            ($_.Type -eq "Boolean") -or
                            ($_.Type -eq "Number") -or
                            ($_.Type -eq "Currency")) {
                            $columnName = $_.Name
                            write-host "Setting value on column"$columnName "..." -foregroundcolor Blue
                            $_.Values.Value | ForEach-Object {
                                $spItem[$columnName] = $_
                                write-host "Value set to"$_
                            }
                        }
                    }
                    catch {}
                    
                    #Multiple line text column
                    try
                    {
                        if ($_.Type -eq "Note") {
                            $columnName = $_.Name
                            write-host "Setting value on column"$columnName "..." -foregroundcolor Blue
                            [string]$multiLineValue = $null
                            $_.Values.Value | ForEach-Object {
                                $multiLineValue = $multiLineValue + $_ + "`n"
                            }
                            $spItem[$columnName] = $multiLineValue
                            write-host "Value on multiiple line text column set"
                        }
                    }
                    catch {}
                    
                    #Multiple choice columns
                    try
                    {
                        if ($_.Type -eq "MultiChoice") {
                            $columnName = $_.Name
                            write-host "Setting value on column"$columnName "..." -foregroundcolor Blue
                            [string]$multiChoiceValue = ";#"
                            $_.Values.Value | ForEach-Object {
                                $multiChoiceValue = $multiChoiceValue + $_ + ";#"
                                write-host "Value"$_ "added to column"
                            }
                            $spItem[$columnName] = $multiChoiceValue
                        }
                    }
                    catch {}
                    
                    #Hyperlink columns
                    try
                    {
                        if ($_.Type -eq "URL") {
                            $columnName = $_.Name
                            write-host "Setting value on column"$columnName "..." -foregroundcolor Blue
                            $urlFieldValue = New-Object Microsoft.SharePoint.SPFieldUrlValue
                            $_.Values.Description | ForEach-Object {
                                $urlFieldValue.Description = $_
                            }
                            $_.Values.Value | ForEach-Object {
                                $urlFieldValue.Url = $_
                            }
                            $spItem[$columnName] = $urlFieldValue
                            write-host "Value set to"$urlFieldValue.Url
                        }
                    }
                    catch {}
                    
                    #Single User column
                    try
                    {
                        if ($_.Type -eq "User") {
                            $columnName = $_.Name
                            $user = $null
                            write-host "Setting value on column"$columnName "..." -foregroundcolor Blue
                            $_.Values.Value | ForEach-Object {
                                #Check to see if SharePoint group exists in the site collection
                                if ($web.SiteGroups[$_])
                                {
                                    #Set account variable to SPGroup
                                    $account = $web.SiteGroups[$_]
                                }
                                else
                                {
                                    #Set account variable to SPUser
                                    $account = $web.EnsureUser($_)
                                }
                                $spItem[$columnName] = $account
                                write-host "Value set to"$_
                            }
                        }
                    }
                    catch {}
                    
                    #Multiple User column
                    try
                    {
                        if ($_.Type -eq "UserMulti") {
                            $columnName = $_.Name
                            $user = $null
                            $userField = New-Object Microsoft.SharePoint.SPFieldUserValueCollection
                            write-host "Setting value on column"$columnName "..." -foregroundcolor Blue
                            $_.Values.Value | ForEach-Object {
                                #Check to see if SharePoint group exists in the site collection
                                if ($web.SiteGroups[$_])
                                {
                                    #Set account variable to SPGroup
                                    $account = $web.SiteGroups[$_]
                                }
                                else
                                {
                                    #Set account variable to SPUser
                                    $account = $web.EnsureUser($_)
                                }
                                $userValue = New-Object Microsoft.SharePoint.SPFieldUserValue($web, $account.ID, $account.Name)
                                $userField.Add($userValue)
                                write-host "Value"$_ "added to column"
                            }
                            $spItem[$columnName] = $userField
                        }
                    }
                    catch {}
                    
                    #Single value Managed Metadata column
                    try
                    {
                        if ($_.Type -eq "TaxonomyFieldType") {
                            $columnName = $_.Name
                            $taxonomySession = Get-SPTaxonomySession -Site $web.Site
                            $termStore = $taxonomySession.DefaultSiteCollectionTermStore
                            
                            $taxonomyField = $docLibrary.Fields[$columnName]
                            
                            $termSet = $termStore.GetTermSet($taxonomyField.TermSetId)
                            write-host "Setting value on column"$columnName "..." -foregroundcolor Blue
                            $_.Values.Value | ForEach-Object {
                                $termCollection = $termSet.GetTerms($_, $true)
                                if ($termCollection.Count -eq 0)
                                { 
                                    $term = $termSet.CreateTerm($_, 1033)
                                    $termStore.CommitAll()
                                }
                                else
                            {
                                    $term = $termCollection[0]
                                }
                                $taxonomyField.SetFieldValue($spItem, $term)
                                write-host "Value set to"$_
                            }
                        }
                    }
                    catch {}
                    
                    #Multi value Managed Metadata column
                    try
                    {
                        if ($_.Type -eq "TaxonomyFieldTypeMulti") {
                            $columnName = $_.Name
                            $taxonomySession = Get-SPTaxonomySession -Site $web.Site
                            $termStore = $taxonomySession.DefaultSiteCollectionTermStore
                            
                            $taxonomyField = $docLibrary.Fields[$columnName]
                            $tfvc = New-Object Microsoft.SharePoint.Taxonomy.TaxonomyFieldValueCollection($taxonomyField)
                                                                    
                            $termSet = $termStore.GetTermSet($taxonomyField.TermSetId)
                            write-host "Setting value on column"$columnName "..." -foregroundcolor Blue
                            $_.Values.Value | ForEach-Object {
                                $termCollection = $termSet.GetTerms($_, $true)
                                if ($termCollection.Count -eq 0)
                                { 
                                    $term = $termSet.CreateTerm($_, 1033)
                                    $termStore.CommitAll()
                                }
                                else
                                {
                                    $term = $termCollection[0]
                                }
                                $valueString = "-1;#" + $term.Name + "|" + $term.Id.ToString()
                                $taxonomyValue = New-Object Microsoft.SharePoint.Taxonomy.TaxonomyFieldValue($valueString)
                                $tfvc.Add($taxonomyValue)
                                write-host "Value"$_ "added to column"
                            }
                            $taxonomyField.SetFieldValue($spItem, $tfvc)
                        }
                    }
                    catch {}
                    
                    #Update document with new column values
                    $spItem.SystemUpdate($false)
                }
        
                #Check in file to document library (if required)
                #MinorCheckIn=0, MajorCheckIn=1, OverwriteCheckIn=2
                if ($CheckIn) {
                    if ($spFile.CheckOutStatus -ne "None") {
                        $spFile.CheckIn("File copied from " + $filePath, 1)
                        write-host $spfile.Name"checked in"
                    }
                }
            
                #Approve file (if required)
                if ($Approve) {
                    if ($spItem.ListItems.List.EnableModeration -eq $true) {
                        $spFile.Approve("File automatically approved after copying from " + $filePath)
                        if ($spItem["Approval Status"] -eq 0) { write-host $spfile.Name"approved" }
                    }
                }
            }
            else
            {
                write-host "`nFile"$_.Name "already exists in" $spFullPath.Replace("/" + $_.Name,"") "and shall not be uploaded" -foregroundcolor Red
            }
        }
    }
    }
    catch [System.SystemException]
    { 
        write-host "The script has stopped because there has been an error.  "$_.Message
    }
    finally
    {
        $web.Dispose()
    }
}

$invocation = (Get-Variable MyInvocation).Value 
$directoryPath = Split-Path $invocation.MyCommand.Path 

$uploadurl = $directoryPath + "\Style Library"
Copy-FilestoSP $uploadurl $path "Style Library"

#Copy-FilestoSP "\Style Library" $path "Style Library"