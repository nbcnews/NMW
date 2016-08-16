param(
[string]$webUrl = $(Read-Host -prompt "Root Web Application Url...?")
#[string]$CsvFilePath = $(Read-Host -prompt "CSV Path...?")
)

try
{
    
    Add-PSSnapin "Microsoft.SharePoint.PowerShell"
        
   #Variables that we are going to use for list editing
    
    
    $listNameShowUnit = "Countires"
 
    #Get the SPWeb object and save it to a variable
    $web = Get-SPWeb $webURL
 
   

    #ShowUnit - List
    #Get the SPList object to retrieve the "ShowUnit List"
    $listCountires = $web.Lists[$listNameCountires]    
    
    Write-Host "Reading Countires CSV"
    $listsDataCountires= Import-Csv ".\CountiresItems.csv"
    Write-Host "Adding Countires items from CSV"
    foreach($item in $listsDataCountires)
    {               
        #Create a new item
        $newItem = $listCountires.Items.Add()
 
        #Add properties to this list item
        $newItem["Title"] = $item.Title
        
        #Update the object so it gets saved to the list
        $newItem.Update()

    }
    Write-Host "Items Added in List : $listNameCountires"

}

catch 
{
    Write-Host "Error in Creating List $_.Exception.Message"
}
finally
{
    Write-Host "Exit of List ..."
}





