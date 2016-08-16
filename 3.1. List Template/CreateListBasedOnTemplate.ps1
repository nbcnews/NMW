param(
[string]$webUrl = $(Read-Host -prompt "Root Web Application Url...?")
#[string]$CsvFilePath = $(Read-Host -prompt "CSV Path...?")
)

try
{
    $invocation = (Get-Variable MyInvocation).Value 
    $directoryPath = Split-Path $invocation.MyCommand.Path 
    #$CsvFilePath = ".\3. Create List\Lists.csv"
    #$CsvFilePath = $directoryPath + ".\Lists.csv"
    Add-PSSnapin "Microsoft.SharePoint.PowerShell"
    
    function UploadListTemplate($WebURL, $TemplateFilePath) { 
           # Get the SiteURL
         $site = get-spsite($WebURL)
  
          # Get the root web
         $web = $site.RootWeb
  
          # Get the list template gallery
         $spLTG = $web.getfolder("List Template Gallery")
  
          # Get the list template gallery Collection
         $spcollection = $spLTG.files
  
          # Get the custom list template file
         $Templatefile = get-item $TemplateFilePath
  
          # Add the custom list template file to gallery
         $spcollection.Add("_catalogs/lt/$($TemplateFile.Name)", $Templatefile.OpenRead(), $true)
  
         Write-Host "Custom Template Uploaded to List Template Gallery Successfully"
  
         Write-Host “Creating the List based on the Template”
  
          # Get the custom list templates 
         $CustomlistTemplates = $site.GetCustomListTemplates($web)
  
  
          #Create the custom list using template
         #$web.Lists.Add("EmailTemplates", "", $CustomlistTemplates)
          $web.Lists.Add("EmailTemplates", "EmailTemplates", $CustomlistTemplates["EmailTemplates"])
  
         Write-Host "Based on the template List Created"

     } 
      #Call the function 
        UploadListTemplate $webUrl ".\3.1. List Template\EmailTemplates.stp"
        #UploadListTemplate $webUrl "EmailTemplates.stp"
}

catch 
{
    Write-Host "Error in Creating List $_.Exception.Message"
}
finally
{
    Write-Host "Exit of List ..."
}





