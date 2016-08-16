 param(
#[string]$inputFile = $(Read-Host -prompt "Enter the CSV"),
[string]$InputedURL = $(Read-Host -prompt "Enter Web Application Root URL")
#[string]$mmsname= $(Read-Host -prompt "Enter the Managed Metadata Service Name …?"),
#[string]$termgroup = $(Read-Host -prompt "Enter Term Group Name")
)

try
{


    $inputFile = "./1. Create Site Columns/SiteColumns.csv"
    #$inputFile = $invocation + "./SiteColumns.csv"
    Add-PSSnapin "Microsoft.SharePoint.PowerShell"
    
    $site = Get-SPSite $InputedURL
    $web = $site.RootWeb
    $siteColumnsToBeAdded = import-csv $inputFile
     
    write-host "Adding Site Columns from the csv file $inputFile"
    write-host "Adding Site Columns to the site $site"
    foreach($siteColumn in $siteColumnsToBeAdded)
    {
        $name = $siteColumn.Name
        
        # Check if the field does not exist already
        if($web.Fields[$name] -eq $null)
        {
            # Get the type of the field
            $type = $siteColumn.Type
            if($type -eq "Managed Metadata") # To create a managed metadata field; do the following
            {
                write-host "Adding Metadata Site Column $name"
                # Get the Taxonomy session of your site collection
                $session = new-object Microsoft.SharePoint.Taxonomy.TaxonomySession($site)
                # Get the Metadata service used by the agency. Change value in "" to match appropriate name
                $serviceApp = Get-SPServiceApplication | Where {$_.TypeName -like $mmsname}
                $termStore = $session.TermStores[$serviceApp.Name]   
                # Get the term store group which stores the term sets you want to retrieve. Change  value in "" to match appropriate name
                $termStoreGroup = $termStore.Groups[$termgroup]
                # Get the term set you want to associate with this field.
                $termSet = $termStoreGroup.TermSets[$siteColumn.TermSet]
                # In most cases, the anchor on the managed metadata field is set to a lower level under the root term of the term set. In such cases, specify the term in the spreadsheet and do the following
                if($siteColumn.TermSet -ne $siteColumn.Term)
                {
                    #Get all terms under term set
                    $terms = $termSet.GetAllTerms()
                    #Get the term to map the column to
                    $term = $terms | Where-Object {$_.Name -eq $siteColumn.Term}
                    #Get the GUID of the term to map the metadata column anchor to
                    $termID = $term.Id
                }
                else # In cases when you want to set the anchor at the root of the term set, leave the  value as blank. Empty guids will error out when you run the script but will accomplish what you need to do i.e. set the anchor at the root of the termset
                {   
                    write-host "Site Column Term specified is not present in web application  $name"                          
                    $termID = [System.GUID]::empty
                }
                $PathDisplay=$siteColumn.PathDisplayFormat
                # Create the new managed metadata field
                $newSiteColumn = $web.Fields.CreateNewField("TaxonomyFieldType", $name)
                # Update the properties of the new field.
                $newSiteColumn.SspId = $termSet.TermStore.ID
                $newSiteColumn.TermSetId = $termSet.Id
                $newSiteColumn.AnchorId = $termID
                $newSiteColumn.IsPathRendered=$PathDisplay
                $newSiteColumn.AllowMultipleValues = $siteColumn.AllowMultipleValues
                $web.Fields.Add($newSiteColumn)
                $web.Update()
            }

            elseif($type -eq "Choice") # To create a choice field; do the following
            {
                write-host "Adding Choice Site Column $name"
                # Build a string array with the choice values separating the values at ","
                $choiceFieldChoices = @($siteColumn.Choices.Split(","))
                # Declare a new empty String collection
                $stringColl = new-Object System.Collections.Specialized.StringCollection
                # Add the choice fields from array to the string collection
                $stringColl.AddRange($choiceFieldChoices)
                # Create a new choice field and add it to the web using overload method
                #  SPFieldCollection.Add method(String SPFieldType, true, true, StringCollection)
                $newSiteColumn = $web.Fields.Add($name,[Microsoft.SharePoint.SPFieldType]::$type, $siteColumn.Required, $false, $stringColl)
                # Update the web
                $web.Update()
            }

            else # For any other type of field; do the following
            {
                write-host "Adding other Site Column $name"
                # Create the new field and add it to the web
                $newSiteColumn = $web.Fields.CreateNewField([Microsoft.SharePoint.SPFieldType]::$type, $name)
                $web.Fields.Add($newSiteColumn)
                $web.update()
                write-host "The following site column has been created $name"
            }
        # You will need to call a new instance of the created site column; direct use of the $newSiteColumn will result in errors
        $sc = $null
        $sc = $web.Fields[$name]
        # Add or remove any properties here
        $sc.Description = $siteColumn.Description
        $sc.Group = $siteColumn.Group
        # Boolean values must be converted before they are assigned in PowerShell.
        [boolean]$sc.ShowInNewForm = [System.Convert]::ToBoolean($siteColumn.ShowInNewForm)
        [boolean]$sc.ShowInDisplayForm = [System.Convert]::ToBoolean($siteColumn.ShowInDisplayForm)
        [boolean]$sc.ShowInEditForm = [System.Convert]::ToBoolean($siteColumn.ShowInEditForm)
        [boolean]$sc.Hidden = [System.Convert]::ToBoolean($siteColumn.Hidden)
        [boolean]$sc.Required = [System.Convert]::ToBoolean($siteColumn.Required)
        $sc.DefaultValue = $siteColumn.DefaultValue
        $sc.Update()
        $web.Update()
    }
    else # If the site column already exists
    {
        write-host "The following site column already exists  $name"
    }

}
}

catch 
{
    write-host "Exception in SiteColumns in $_.Exception.Message"
}
finally
{
    write-host "Exit of Site Columns ..."
    $site.Dispose()
   
}