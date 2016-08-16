param(
[string]$webUrl = $(Read-Host -prompt "Root Web Application Url...?")
#[string]$CsvFilePath = $(Read-Host -prompt "CSV Path...?")
)

try
{
    
    Add-PSSnapin "Microsoft.SharePoint.PowerShell"
        
   #Variables that we are going to use for list editing
    
    
    $listNameFrequentLocation = "FrequentLocation"
 
    #Get the SPWeb object and save it to a variable
    $web = Get-SPWeb $webURL
 
   

    #FrequentLocation - List
    #Get the SPList object to retrieve the "FrequentLocation List"
    $listFrequentLocation = $web.Lists[$listNameFrequentLocation]    
    
    Write-Host "Reading FrequentLocation CSV"
    $listsDataFrequentLocation= Import-Csv ".\FrequentLocationItems.csv"
    Write-Host "Adding FrequentLocation items from CSV"
    foreach($item in $listsDataFrequentLocation)
    {               
        #Create a new item
        $newItem = $listFrequentLocation.Items.Add()
 
        #Add properties to this list item
        $newItem["FrequentLocationName"] = $item.FrequentLocationName
        $newItem["Title"] = $item.Title
        $newItem["AddressLine1"] = $item.AddressLine1
        $newItem["CrewCity"] = $item.CrewCity
        $newItem["CrewState"] = $item.CrewState
        $newItem["Country"] = $item.Country
        $newItem["Zip"] = $item.Zip
        
        #Update the object so it gets saved to the list
        $newItem.Update()

    }
    Write-Host "Items Added in List : $listNameFrequentLocation"

}

catch 
{
    Write-Host "Error in Creating List $_.Exception.Message"
}
finally
{
    Write-Host "Exit of List ..."
}





