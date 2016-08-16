 param(
[string]$rooturl = $(Read-Host -prompt "Enter Web Application Root URL...?")
)

Add-PSSnapin "Microsoft.SharePoint.PowerShell"

try
{
    Write-Host "Setting Home Page to Welcome Page & Site Logo in  $rooturl"
    $assignment = Start-SPAssignment
    $web = Get-SPWeb -Identity $rooturl -AssignmentCollection $assignment
    $rootFolder = $web.RootFolder
    $rootFolder.WelcomePage = "Pages/Home.aspx"
    $web.SiteLogoUrl="/sites/bcast_prodreq/Style%20Library/logo.png"

    $web.CustomMasterUrl = "/sites/bcast_prodreq/_catalogs/masterpage/NewsMediaMaster.master"
    $web.MasterUrl = "/sites/bcast_prodreq/_catalogs/masterpage/seattle.master"

    $rootFolder.Update()
    $web.Update()
    Stop-SPAssignment $assignment
    Write-Host "Home Page is Welcome Page & Site Logo in $rooturl"
   # Write-Host "Setting master pages to $rooturl"
   # $web.CustomMasterUrl = "/service/_catalogs/masterpage/seattle.master"
   # $web.MasterUrl ="/service/_catalogs/masterpage/seattle.master"
   # Write-Host "System and custom master page are set"
   # $web.Update()
}

catch 
{
    Write-Host "Exception in Set Master Page - $_.Exception.Message"
}
finally
{
    $web.Dispose()
    Write-Host "Exit of Master Page..."
}
