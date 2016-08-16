param(
 
 [string]$webAppUrl = $(Read-Host -prompt "Enter Web Application Root URL"))
 #[string]$masterPageLocalDir = $(Read-Host -prompt "Enter the Page Layouts Path"))

[void][System.Reflection.Assembly]::LoadWithPartialName("Microsoft.Sharepoint")
[void][System.Reflection.Assembly]::LoadWithPartialName("Microsoft.Sharepoint.Administration")

$invocation = (Get-Variable MyInvocation).Value 
$directoryPath = Split-Path $invocation.MyCommand.Path 

#$masterPageLocalDir=".\6. Upload Master Page\Master Page"
$masterPageLocalDir = $directoryPath + "\Master Page"

$checkInComment="Check In"
$publishComment="published"
$approveComment="Approved"

$spsite = new-object Microsoft.Sharepoint.SPSite($webAppUrl);
$web = $spsite.RootWeb;
 
    $masterPageList = ($web).GetFolder("Master Page Gallery")
    # Get file system path
$filesfolde = Split-Path $script:MyInvocation.MyCommand.Path


    #For upload all files in document library from file system
foreach ($file in Get-ChildItem $masterPageLocalDir)
	{
	$web.AllowUnsafeUpdates=$true;
try
{
	
	
	$stream = [IO.File]::OpenRead($file.fullname)
          $destUrl = $web.Url + "/_catalogs/masterpage/" + $file.Name;
		$masterPageFile=$web.GetFile($destUrl)
	 Write-Host ($masterPageFile)
           if($masterPageFile.CheckOutStatus -ne "None")
		{
				
				#$web.AllowUnsafeUpdates  = $true;
				$masterPageList.files.Add($destUrl,$stream,$true)
				
				
				$stream.close()	
                 $masterPageFile.CheckOut();
                 	
				$masterPageFile.CheckIn($checkInComment);						
				 $masterPageFile.Publish($publishComment);				

				 $masterPageFile.Update();         
         			 $web.Update();
        			  $web.AllowUnsafeUpdates  = $false;
        			  $outputText = $file.Name+ " Master Page uploaded on $web site"
       				  Write-Host $outputText
       				  Write-Host $outputText 
		}
	    else
		{
 				 $masterPageFile.CheckOut();
				 try{
				 $masterPageList.Files.Add($destUrl,$stream,$true)
				 }
				 catch
				 {
				 Write-Host $_
				 }
				 $stream.close()
			  
				 $masterPageFile.CheckIn($checkInComment);						  
				 $masterPageFile.Publish($publishComment);						  
				 #$masterPageFile.Approve($approveComment);
				 $masterPageFile.Update();         
         			 $web.Update();
        			  $web.AllowUnsafeUpdates  = $false;
        			  $ouputText = $file.Name +  " Master Page uploaded on $web site"
       				  Write-Host $outputText
       				  Write-Host $outputText 
	
		}
	
	
	
	
}
catch
{
	Write-Host "Error on Uploading Pages  $_.Exception.Message"

}
}
$web.dispose();
$spsite.dispose();
