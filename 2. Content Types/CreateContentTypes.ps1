 param(
[string]$SiteUrl = $(Read-Host -prompt "Root Web Application URL...?")
#[string]$CsvFilePath = $(Read-Host -prompt "CSV File Path...?")
)

try
{
$invocation = (Get-Variable MyInvocation).Value 
$directoryPath = Split-Path $invocation.MyCommand.Path 

#$CsvFilePath = ".\2. Content Types\ContentTypes.csv"
$CsvFilePath = $directoryPath + ".\ContentTypes.csv"
Add-PSSnapin "Microsoft.SharePoint.PowerShell"
    
 # Create an array to store the field links to all site columns that will be added to the content type
 $fieldLinksArray = @()
#Import values from the CSV
$ctToBeAdded = import-csv $CsvFilePath 
write-host "Loaded Data from CSV file $CsvFilePath"
foreach($item in $ctToBeAdded)
{
    $fieldLinksArray = @()
    $site = Get-SPSite $SiteUrl
    $ctToBeAddedWeb = $site.RootWeb
    #$ctToBeAddedWeb= Get-SPWeb $SiteUrl
    $parentContentType = $ctToBeAddedWeb.ContentTypes[$item.Parent]
    $ctToBeAddedCollection = $ctToBeAddedWeb.ContentTypes
    $ctToBeAddedName = $item.ContentTypeName
    $ctSiteColumns = $item.SiteColumns

    # Store all site columns in an array by splitting values at "," 
    $ctSiteColumnsArray = $ctSiteColumns.Split(",")
    foreach($siteColumn in $ctSiteColumnsArray)
    {
        $ctSiteColumnToBeAdded = $ctToBeAddedWeb.Fields[$siteColumn]       
        if($ctSiteColumnToBeAdded -ne $null)
        
        {
            $fieldLink = new-object Microsoft.SharePoint.SPFieldLink $ctSiteColumnToBeAdded
        
            # Add it to the field link array
            $fieldLinksArray += ,$fieldLink
        }
        else # Site column does not exist
        {
            write-host "The Site Column: $siteColumn to be added to content type: $ctToBeAddedName does not exist"
        }        
    }
 
    # Check if the content type exists   
    write-host "Adding Content Type $item"
    if($ctToBeAddedWeb.ContentTypes[$item.ContentTypeName]-eq $null)
    {
       # Create a new content type
        $newContentType = new-object Microsoft.SharePoint.SPContentType($parentContentType,$ctToBeAddedCollection,$ctToBeAddedName)
        $ctToBeAddedCollection.Add($newContentType)    
        $newContentType.Group = $item.Group
        $newContentType.Description = $item.Description
        [boolean]$newContentType.ReadOnly = [System.Convert]::ToBoolean($item.ReadOnly)
        
      
       foreach($link in $fieldLinksArray)
      {
           $newContentType.FieldLinks.Add($link)
      }

        $newContentType.Update([System.Convert]::ToBoolean($item.UpdateChildContentTypes))
        write-host "Content Type: $item added successfully"
   }
    else 
    {

     $cType = $ctToBeAddedWeb.ContentTypes[$item.ContentTypeName]

       write-host "Content Type already exists: $item "
       
       foreach($link in $fieldLinksArray)
      {
           $cType.FieldLinks.Add($link)
           $cType.Update($false,$true)
           write-host "Site Column $link added to contentType $cType "
      }

    }
}
}

catch 
{
    write-host "Exception in Content Types $_.Exception.Message"
}
finally
{
    write-host "Exit of Content Types ..."
    $ctToBeAddedWeb.Dispose()
    
}


