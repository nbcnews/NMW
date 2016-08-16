
 param(
# [string]$CsvFilePath = $(Read-Host -prompt "Enter the CSV"),
 [string]$InputedURL = $(Read-Host -prompt "Enter Web Application Root URL")
 #[string]$pagesCSV = $(Read-Host -prompt "Enter Web Pages CSV Location")
 )

Add-PSSnapin "Microsoft.SharePoint.PowerShell"

$invocation = (Get-Variable MyInvocation).Value 
$directoryPath = Split-Path $invocation.MyCommand.Path  

$CsvFilePath = $directoryPath + "\CreatePages.csv"
$pagesCSV = $directoryPath + "\Pages\"

  function AddWebpartsToPage($weburl, $pageName, $webpartName, $webpartTitle, $webpartZone , $webpartIndex)
 {
 
 try
 {
     $errorMsg = "WebPart Error Message"
     $Web = Get-SPWeb $WebUrl
     $PubWeb = [Microsoft.SharePoint.Publishing.PublishingWeb]::GetPublishingWeb($Web)
     $PublishingPage = $PubWeb.GetPublishingPage( $weburl+"/Pages/"+$pageName);
     $Web.AllowUnsafeUpdates = $true
     $PublishingPage.CheckOut();
     $limitedWebPartManager = $PublishingPage.ListItem.File.GetLimitedWebPartManager([System.Web.UI.WebControls.WebParts.PersonalizationScope]::Shared);
     [Microsoft.SharePoint.SPList]$wpList = $web.GetCatalog([Microsoft.SharePoint.SPListTemplateType]::WebPartCatalog) 
     [Microsoft.SharePoint.SPFolder]$wpFolder = $wpList.RootFolder
     [Microsoft.SharePoint.SPFile]$wpFile = $wpFolder.Files[$webpartName]
     [System.Xml.XmlReader]$xmlReader = [System.Xml.XmlReader]::Create($wpFile.OpenBinaryStream()) 
     $oWebPartDefinition = $limitedWebPartManager.ImportWebPart($xmlReader,[ref]$errorMsg);
     $oWebPartDefinition.Title =$webpartTitle 
     $limitedWebPartManager.AddWebPart($oWebPartDefinition,$webpartZone,$webpartIndex);
     $PublishingPage.CheckIn("Checked in from PowerShelll");
     $PublishingPage.ListItem.File.Publish("Published from PowerShell");
     $Web.AllowUnsafeUpdates = $false
 }
 
 catch 
 {
      write-host "Error in Adding Webpart $webpartName to Page $pageName $_.Exception.Message"
 }
 finally
 {
     $Web.Dispose();
 }
 
 }

 function CreatePages($pageName,$pageTitle,$pageLayout,$web,$webpartLocalPath)
    {
            try
            {
               $spWeb = Get-SPWeb($web);
               $pubWeb = [Microsoft.SharePoint.Publishing.PublishingWeb]::GetPublishingWeb($spWeb)
               $pl = $pubWeb.GetAvailablePageLayouts() | Where { $_.Name -eq $pageLayout}
               $pages = $pubWeb.GetPublishingPages();
               $pageurl=$web+"/Pages/"+$pageName
               $singlepage= $pubWeb.GetPublishingPage($pageurl)
               if($singlepage -ne $null)
               {
                $singlepage.ListItem.Delete()
                write-host "Old Page: $pageName Deleted "
               }
               $pgurl= $web+"/Pages/"+$pageName
               $page = $pubWeb.AddPublishingPage($pgurl,$pl)
               $page.Title = $pageTitle
               $page.Update();
               $page.CheckIn(“Created by PowerShell Script”);
               $page.ListItem.File.Publish("Published by PowerShell Script")
               write-host "Page Created $pageName"
              
               write-host "Adding Webparts to page"
               $wppath=$webpartLocalPath+$pageName+".csv"
               $webpartsLoc= import-csv $wppath
               foreach($Singlewp in $webpartsLoc)
               {
               write-host "Adding webpart $Singlewp to $pageName"
                AddWebpartsToPage $web $pageName $Singlewp.WebPartUrl $Singlewp.WebPartTitle $Singlewp.WebPartZone $Singlewp.WebPartZoneIndex
        
               }          
               
              
            }
            catch 
            {
                 write-host "Error in Creating Pages $_.Exception.Message"
            }
            
            finally
            {
                $spWeb.Dispose();
            } 
    }

function CreateFolder($web,$foldername)
{
       try
       {
          
        $spWeb = Get-SPWeb($web);
        $pubWeb = [Microsoft.SharePoint.Publishing.PublishingWeb]::GetPublishingWeb($spWeb)
        $pageLib= $pubWeb.PagesList

        #Folder
        $folderflag = $pageLib.ParentWeb.GetFolder("Pages/"+$foldername)
        if($folderflag.Exists)
        {
            write-host "Folder $foldername Already Exists" 
        }
        else
        {
            
          $pageLib.RootFolder.SubFolders.Add($foldername)
        }
       }
       catch 
       {
           write-host "Error in Creating Folder $_.Exception.Message"
       }
       
       finally
       {
            $spWeb.Dispose()
       }

}

function AddContentEditorWebPart($siteUrl, $pageUrl, $jsLink, $wpTitle, $wpzone, $wpid){
$web = get-spweb $siteUrl
$defaultPage = $web.GetFile($pageUrl)
$defaultPage.CheckOut();
# Get the LimitedWebPartManager
$webpartmanager=$defaultPage.GetLimitedWebPartManager([System.Web.UI.WebControls.WebParts.PersonalizationScope]::Shared)

#Create fancy GUID
$lvwpGuid1 = [System.Guid]::NewGuid().ToString()
$lvwpKey = "g_" + $lvwpGuid1.Replace("-","_")

# Instantiate wp
$lvwp =New-Object Microsoft.SharePoint.WebPartPages.ContentEditorWebPart 
$lvwp.ID = $lvwpKey
$code = "$"
$lvwp.ContentLink =  @"
$conetntLink
"@
$lvwp.Title = $wpTitle 
$lvwp.Visible =$true
$lvwp.ChromeType = "None"

# Add the web part
$webpartmanager.AddWebPart($lvwp, $wpzone,$wpid);
$defaultPage.CheckIn("Checked in from PowerShelll");
$defaultPage.Publish("Published from PowerShell");
$web.Update();
$web.Dispose()  



}

#Main Function

    Add-PSSnapin "Microsoft.SharePoint.PowerShell"
   # CreateFolder $InputedURL "SystemPages"
    $pagestobeCreated = import-csv $CsvFilePath
    write-host "Loaded Data from CSV file $CsvFilePath"
    foreach($Singlepage in $pagestobeCreated)
    {
        CreatePages $Singlepage.PageName $Singlepage.PageTitle $Singlepage.PageLayout $InputedURL $pagesCSV
        
    }



