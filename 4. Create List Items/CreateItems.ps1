param(
[string]$webUrl = $(Read-Host -prompt "Root Web Application Url...?")
#[string]$CsvFilePath = $(Read-Host -prompt "CSV Path...?")
)

try
{
    
    Add-PSSnapin "Microsoft.SharePoint.PowerShell"

    $invocation = (Get-Variable MyInvocation).Value 
    $directoryPath = Split-Path $invocation.MyCommand.Path 
        
   #Variables that we are going to use for list editing
    
    $listNameAudioNeed = "AudioNeed"
    $listNameFrequentLocation = "FrequentLocation"
    $listNameProductionType = "ProductionType"
    $listNameResourceReason = "ResourceReason"
    $listNameSpecialCondition = "SpecialCondition"
    $listNameStory = "Story"
    $listNameTalent = "Talent"
    $listNameTalentType = "TalentType"
    $listNameTransmissionType = "TransmissionType"
    $listNameShowUnit = "ShowUnit"
    $listNameCountires = "Countires"
    $listNameStates = "States"
    $listNameRoom = "Room" 
    $listNameLocationOfEdit = "LocationOfEdit"
    $listNameBusiness = "Business"
 
    #Get the SPWeb object and save it to a variable
    $web = Get-SPWeb $webURL
 
    #AudioNeed - List
    #Get the SPList object to retrieve the "AudioNeed List"
    $listAudioNeed = $web.Lists[$listNameAudioNeed]    
    
    Write-Host "Reading Audio Need CSV"
    #$listsDataAudioNeed = Import-Csv ".\4. Create List Items\AudioNeed\AudioNeedItems.csv" #$directoryPath
    $listsDataAudioNeed = Import-Csv ".\4. Create List Items\AudioNeed\AudioNeedItems.csv"
    Write-Host "Adding Audio Need items from CSV"
    foreach($item in $listsDataAudioNeed)
    {               
        #Create a new item
        $newItem = $listAudioNeed.Items.Add()
 
        #Add properties to this list item
        $newItem["Title"] = $item.Title
        $newItem["AudioNeed"] = $item.AudioNeed
        $newItem["AudioNeedPointValue"] = $item.AudioNeedPointValue
 
        #Update the object so it gets saved to the list
        $newItem.Update()

    }
    Write-Host "Items Added in List : $listNameAudioNeed"

    #FrequentLocation - List
    #Get the SPList object to retrieve the "FrequentLocation List"
    $listFrequentLocation = $web.Lists[$listNameFrequentLocation]    
    
    Write-Host "Reading Frequent Location CSV"
    $listsDataFrequentLocation= Import-Csv ".\4. Create List Items\FrequentLocation\FrequentLocationItems.csv"
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

    #Production Type - List
    #Get the SPList object to retrieve the "ProductionType List"
    $listProductionType = $web.Lists[$listNameProductionType]    
    
    Write-Host "Reading ProductionType CSV"
    $listsDataProductionType= Import-Csv ".\4. Create List Items\ProductionType\ProductionTypeItems.csv"
    Write-Host "Adding Production Type items from CSV"
    foreach($item in $listsDataProductionType)
    {               
        #Create a new item
        $newItem = $listProductionType.Items.Add()
 
        #Add properties to this list item
        $newItem["Title"] = $item.Title
        $newItem["ProductionType"] = $item.ProductionType
        $newItem["ProductionTypePointValue"] = $item.ProductionTypePointValue
 
        #Update the object so it gets saved to the list
        $newItem.Update()

    }
    Write-Host "Items Added in List : $listNameProductionType"

    #Resource Reason - List
    #Get the SPList object to retrieve the "ResourceReason List"
    $listResourceReason = $web.Lists[$listNameResourceReason]    
    
    Write-Host "Reading ResourceReason CSV"
    $listsDataResourceReason= Import-Csv ".\4. Create List Items\ResourceReason\ResourceReasonItems.csv"
    Write-Host "Adding ResourceReason items from CSV"
    foreach($item in $listsDataResourceReason)
    {               
        #Create a new item
        $newItem = $listResourceReason.Items.Add()
 
        #Add properties to this list item
        $newItem["Title"] = $item.Title
 
        #Update the object so it gets saved to the list
        $newItem.Update()

    }
    Write-Host "Items Added in List : $listNameResourceReason"

    #Special Condition - List
    #Get the SPList object to retrieve the "SpecialCondition List"
    $listSpecialCondition = $web.Lists[$listNameSpecialCondition]    
    
    Write-Host "Reading SpecialCondition CSV"
    $listsDataSpecialCondition= Import-Csv ".\4. Create List Items\SpecialCondition\SpecialConditionItems.csv"
    Write-Host "Adding SpecialCondition items from CSV"
    foreach($item in $listsDataSpecialCondition)
    {               
        #Create a new item
        $newItem = $listSpecialCondition.Items.Add()
 
        #Add properties to this list item
        $newItem["Title"] = $item.Title
        $newItem["SpecialConditions"] = $item.SpecialConditions
        $newItem["SpecialConditionPointValue"] = $item.SpecialConditionPointValue
 
        #Update the object so it gets saved to the list
        $newItem.Update()

    }
    Write-Host "Items Added in List : $listNameSpecialCondition"

    
    

    #Talent - List
    #Get the SPList object to retrieve the "Demo List"
    $listTalent = $web.Lists[$listNameTalent]    
    
    Write-Host "Reading Talent CSV"
    $listsDataTalent= Import-Csv ".\4. Create List Items\Talent\TalentItems.csv"
    Write-Host "Adding Talent items from CSV"
    foreach($item in $listsDataTalent)
    {               
        #Create a new item
        $newItem = $listTalent.Items.Add()
 
        #Add properties to this list item
        $newItem["Title"] = $item.Title
        $newItem["TalentTypeID"] = $item.TalentTypeID
        $newItem["TalentFirstName"] = $item.TalentFirstName
        $newItem["TalentLastName"] = $item.TalentLastName
 
        #Update the object so it gets saved to the list
        $newItem.Update()

    }
    Write-Host "Items Added in List : $listNameTalent"


    #TalentType - List
    #Get the SPList object to retrieve the "TalentType List"
    $listTalentType = $web.Lists[$listNameTalentType]    
    
    Write-Host "Reading TalentType CSV"
    $listsDataTalentType= Import-Csv ".\4. Create List Items\TalentType\TalentTypeItems.csv"
    Write-Host "Adding TalentType items from CSV"
    foreach($item in $listsDataTalentType)
    {               
        #Create a new item
        $newItem = $listTalentType.Items.Add()
 
        #Add properties to this list item
        $newItem["Title"] = $item.Title
        $newItem["TalentType"] = $item.TalentType
        $newItem["TalentTypePointValue"] = $item.TalentTypePointValue
 
        #Update the object so it gets saved to the list
        $newItem.Update()

    }
    Write-Host "Items Added in List : $listNameTalentType"


    #TransmissionType - List
    #Get the SPList object to retrieve the "TransmissionType List"
    $listTransmissionType = $web.Lists[$listNameTransmissionType]    
    
    Write-Host "Reading TransmissionType CSV"
    $listsDataTransmissionType= Import-Csv ".\4. Create List Items\TransmissionType\TransmissionTypeItems.csv"
    Write-Host "Adding TransmissionType items from CSV"
    foreach($item in $listsDataTransmissionType)
    {               
        #Create a new item
        $newItem = $listTransmissionType.Items.Add()
 
        #Add properties to this list item
        $newItem["Title"] = $item.Title
        $newItem["TransmissionType"] = $item.TransmissionType
        $newItem["TransmissionTypePointValue"] = $item.TransmissionTypePointValue
 
        #Update the object so it gets saved to the list
        $newItem.Update()

    }
    Write-Host "Items Added in List : $listNameTransmissionType"

    #Story - List
    #Get the SPList object to retrieve the "Story List"
    $listStory = $web.Lists[$listNameStory]    
    
    Write-Host "Reading Story CSV"
    $listsDataStory= Import-Csv ".\4. Create List Items\Story\StoryItems.csv"
    Write-Host "Adding TransmissionType items from CSV"
    foreach($item in $listsDataStory)
    {               
        #Create a new item
        $newItem = $listStory.Items.Add()
 
        #Add properties to this list item
        $newItem["Title"] = $item.Title
        $newItem["Story"] = $item.Story
 
        #Update the object so it gets saved to the list
        $newItem.Update()

    }
    Write-Host "Items Added in List : $listNameStory"

    #ShowUnit - List
    #Get the SPList object to retrieve the "ShowUnit List"
    $listShowUnit = $web.Lists[$listNameShowUnit]    
    
    Write-Host "Reading ShowUnit CSV"
    $listsDataShowUnit= Import-Csv ".\4. Create List Items\ShowUnit\ShowUnitItems.csv"
    Write-Host "Adding ShowUnit items from CSV"
    foreach($item in $listsDataShowUnit)
    {               
        #Create a new item
        $newItem = $listShowUnit.Items.Add()
 
        #Add properties to this list item
        $newItem["Title"] = $item.Title
        $newItem["ShowUnitTitle"] = $item.ShowUnitTitle
        $newItem["DefaultBudgetCode"] = $item.DefaultBudgetCode
	$newItem["Business"] = $item.Business
 
        #Update the object so it gets saved to the list
        $newItem.Update()

    }
    Write-Host "Items Added in List : $listNameShowUnit"

    #Countires - List
    #Get the SPList object to retrieve the "Countires List"
    $listCountires = $web.Lists[$listNameCountires]    
    
    Write-Host "Reading Countires CSV"
    $listsDataCountires= Import-Csv ".\4. Create List Items\Countires\CountiresItems.csv"
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


    #States - List
    #Get the SPList object to retrieve the "States List"
    $listStates = $web.Lists[$listNameStates]    
    
    Write-Host "Reading States CSV"
    $listsDataStates= Import-Csv ".\4. Create List Items\States\StatesItems.csv"
    Write-Host "Adding States items from CSV"
    foreach($item in $listsDataStates)
    {               
        #Create a new item
        $newItem = $listStates.Items.Add()
 
        #Add properties to this list item
        $newItem["Title"] = $item.Title
        
        #Update the object so it gets saved to the list
        $newItem.Update()

    }
    Write-Host "Items Added in List : $listNameStates"

    #Room - List
    #Get the SPList object to retrieve the "Room List"
    $listRoom = $web.Lists[$listNameRoom]    
    
    Write-Host "Reading Room CSV"
    $listsDataRoom = Import-Csv ".\4. Create List Items\Room\Room.csv"
    #$listsDataRoom = Import-Csv ".\Room\Room.csv"
    Write-Host "Adding Room items from CSV"
    foreach($item in $listsDataRoom)
    {               
        #Create a new item
        $newItem = $listRoom.Items.Add()
 
        #Add properties to this list item
        $newItem["Title"] = $item.Title
        $newItem["Facilities"] = $item.Facilities
 
        #Update the object so it gets saved to the list
        $newItem.Update()

    }
    Write-Host "Items Added in List : $listNameRoom"  

    #LocationOfEdit - List
    #Get the SPList object to retrieve the "LocationOfEdit List"
    $listLocationOfEdit = $web.Lists[$listNameLocationOfEdit]    
    
    Write-Host "Reading LocationOfEdit CSV"
    $listsDataLocationOfEdit = Import-Csv ".\4. Create List Items\LocationOfEdit\LocationOfEdit.csv"
    #$listsDataLocationOfEdit = Import-Csv ".\LocationOfEdit\LocationOfEdit.csv"
    Write-Host "Adding LocationOfEdit items from CSV"
    foreach($item in $listsDataLocationOfEdit)
    {               
        #Create a new item
        $newItem = $listLocationOfEdit.Items.Add()
 
        #Add properties to this list item
        $newItem["Title"] = $item.Title
 
        #Update the object so it gets saved to the list
        $newItem.Update()

    }
    Write-Host "Items Added in List : $listNameLocationOfEdit"  


    #Business - List
    #Get the SPList object to retrieve the "Business List"
    $listBusiness = $web.Lists[$listNameBusiness]    
    
    Write-Host "Reading Business CSV"
    $listsDataBusiness = Import-Csv ".\4. Create List Items\Business\Business.csv"
    #$listsDataBusiness = Import-Csv ".\Business\Business.csv"
    Write-Host "Adding Business items from CSV"
    foreach($item in $listsDataBusiness)
    {               
        #Create a new item
        $newItem = $listBusiness.Items.Add()
 
        #Add properties to this list item
        $newItem["Title"] = $item.Title
 
        #Update the object so it gets saved to the list
        $newItem.Update()

    }
    Write-Host "Items Added in List : $listNameBusiness" 

}

catch 
{
    Write-Host "Error in Creating List $_.Exception.Message"
}
finally
{
    Write-Host "Exit of List ..."
}





