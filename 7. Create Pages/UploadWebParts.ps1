param(
[string] $siteCollectionUrl = $(Read-Host -prompt "Enter Web Application Root URL...?")
#[string] $folderpath= $(Read-Host -prompt "Enter the Folder Path")
)

Add-PSSnapin "Microsoft.SharePoint.PowerShell"

$invocation = (Get-Variable MyInvocation).Value 
$directoryPath = Split-Path $invocation.MyCommand.Path 

$folderpath= $directoryPath + "\Webparts"

foreach ($Singlefile in Get-ChildItem $folderpath)
	{

try
{
$site =new-object Microsoft.SharePoint.SPSite($siteCollectionUrl)
$web = $site.OpenWeb()
$list = $web.Lists["Web Part Gallery"]
$folder = $list.RootFolder
$file=Get-Item $Singlefile.FullName
$fileStream=([System.IO.FileInfo](Get-Item $file.FullName)).OpenRead()
$spFile=$folder.Files.Add($folder.Url + “/” + $file.Name, [System.IO.Stream]$fileStream, $true)
$fileStream.Close()
write-host "WebPart Uploaded Successfully $file.Name"
$listitem=$list.Items | ?{$_["Name"] -eq $file.Name}
$listitem["Group"]="NMWF_Webparts"
$listitem.Update()
}

catch
{
    write-host "Exception in Uploading Webparts $_.Exception.Message"
}
finally
{
   
    $web.Dispose()
    $site.Dispose()
}
}
 write-host "Exit of Webparts ..."