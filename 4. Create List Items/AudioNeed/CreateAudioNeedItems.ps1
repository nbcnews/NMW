param(
[string]$webUrl = $(Read-Host -prompt "Root Web Application Url...?"),
[string]$CsvFilePath = $(Read-Host -prompt "CSV Path...?")
)

try
{
    
    Add-PSSnapin "Microsoft.SharePoint.PowerShell"
        
    function CreateSharePointLibrary {

    [CmdletBinding()]

    Param(

       [Parameter(Mandatory=$true, Position=0, ValueFromPipeline=$true)]

       [string]$webUrl,

       [Parameter(Mandatory=$true, Position=1)]

       [string]$LibraryName,

       [Parameter(Mandatory=$true, Position=2)]

       [string]$Description,
       
       [Parameter(Mandatory=$true, Position=3)]

       [string]$ContentType,

       [Parameter(Mandatory=$false, Position=4)]

       [string]$LibraryTemplate     


    )

   Process

   {

      Start-SPAssignment -Global 

      $spWeb = Get-SPWeb -Identity $webUrl    

      $spListCollection = $spWeb.Lists  

      $spLibrary = $spListCollection.TryGetList($LibraryName)

      if($spLibrary -ne $null) {

          Write-Host "Library $LibraryName already exists in the site"

      } 
      else {       

          Write-Host "Creating  Library - $LibraryName"
          $spListCollection.Add($LibraryName, $Description, $LibraryTemplate)
          Write-Host "Added List! $LibraryName"


          ######
        $listorLibrary = $spListCollection.TryGetList($LibraryName)

        if ($listorLibrary -ne $null)
        {
            $listorLibrary.ContentTypesEnabled = $true
            $listorLibrary.Update()

            #Add site content types to the list
            $ctToAdd = $spWeb.ContentTypes[$ContentType]
            $ct = $listorLibrary.ContentTypes.Add($ctToAdd)
            write-host "Content type" $ct.Name "added to list" $listorLibrary.Title
            $listorLibrary.Update()

            #Setting Default Content Type
            $currentOrder = $listorLibrary.ContentTypes
            $result=New-Object System.Collections.Generic.List[Microsoft.SharePoint.SPContentType]
            foreach ($ct in $currentOrder)
            {
             if ($ct.Name.Contains($ContentType))
             {
               $result.Add($ct)
             }
            }
            $listorLibrary.RootFolder.UniqueContentTypeOrder = $result
            $listorLibrary.RootFolder.Update() 

        }
        else
        {
            write-host "The list" $LibraryName "does not exist in site" $spWeb.Title
        }
        #######


      }         

      $spWeb.Dispose()
      Stop-SPAssignment -Global  

   }

} 
    
    
    $listsData= Import-Csv $CsvFilePath
    foreach($item in $listsData)
    {
        Write-Host "Adding List : $item"
        $Template = $item.ListTemplate
        $LibraryTemplateDL = [Microsoft.SharePoint.SPListTemplateType]::$Template
        #Function Calling
        CreateSharePointLibrary $webUrl $item.ListName $item.Description $item.ContentType $LibraryTemplateDL
        
        

            

    }
}

catch 
{
    Write-Host "Error in Creating List $_.Exception.Message"
}
finally
{
    Write-Host "Exit of List ..."
}





