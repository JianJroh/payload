import type { DefaultTranslationKeys } from './types.js'

function createClientTranslationKeys<T extends DefaultTranslationKeys[]>(keys: T) {
  return keys
}

export const clientTranslationKeys = createClientTranslationKeys([
  'authentication:account',
  'authentication:accountOfCurrentUser',
  'authentication:accountVerified',
  'authentication:alreadyActivated',
  'authentication:alreadyLoggedIn',
  'authentication:apiKey',
  'authentication:authenticated',
  'authentication:backToLogin',
  'authentication:beginCreateFirstUser',
  'authentication:changePassword',
  'authentication:checkYourEmailForPasswordReset',
  'authentication:confirmGeneration',
  'authentication:confirmPassword',
  'authentication:createFirstUser',
  'authentication:emailNotValid',
  'authentication:usernameNotValid',
  'authentication:emailOrUsername',
  'authentication:emailSent',
  'authentication:emailVerified',
  'authentication:enableAPIKey',
  'authentication:failedToUnlock',
  'authentication:forceUnlock',
  'authentication:forgotPassword',
  'authentication:forgotPasswordEmailInstructions',
  'authentication:forgotPasswordUsernameInstructions',
  'authentication:forgotPasswordQuestion',
  'authentication:generate',
  'authentication:generateNewAPIKey',
  'authentication:generatingNewAPIKeyWillInvalidate',
  'authentication:logBackIn',
  'authentication:loggedOutInactivity',
  'authentication:loggedOutSuccessfully',
  'authentication:loggingOut',
  'authentication:login',
  'authentication:logOut',
  'authentication:loggedIn',
  'authentication:loggedInChangePassword',
  'authentication:logout',
  'authentication:logoutUser',
  'authentication:logoutSuccessful',
  'authentication:newAPIKeyGenerated',
  'authentication:newPassword',
  'authentication:passed',
  'authentication:passwordResetSuccessfully',
  'authentication:resetPassword',
  'authentication:stayLoggedIn',
  'authentication:successfullyRegisteredFirstUser',
  'authentication:successfullyUnlocked',
  'authentication:username',
  'authentication:unableToVerify',
  'authentication:tokenRefreshSuccessful',
  'authentication:verified',
  'authentication:verifiedSuccessfully',
  'authentication:verify',
  'authentication:verifyUser',
  'authentication:youAreInactive',

  'error:autosaving',
  'error:correctInvalidFields',
  'error:deletingTitle',
  'error:emailOrPasswordIncorrect',
  'error:usernameOrPasswordIncorrect',
  'error:loadingDocument',
  'error:invalidRequestArgs',
  'error:invalidFileType',
  'error:logoutFailed',
  'error:noMatchedField',
  'error:notAllowedToAccessPage',
  'error:previewing',
  'error:unableToDeleteCount',
  'error:unableToReindexCollection',
  'error:unableToUpdateCount',
  'error:unauthorized',
  'error:unauthorizedAdmin',
  'error:unknown',
  'error:unspecific',
  'error:userEmailAlreadyRegistered',
  'error:usernameAlreadyRegistered',
  'error:tokenNotProvided',
  'error:unPublishingDocument',

  'fields:addLabel',
  'fields:addLink',
  'fields:addNew',
  'fields:addNewLabel',
  'fields:addRelationship',
  'fields:addUpload',
  'fields:block',
  'fields:blocks',
  'fields:blockType',
  'fields:chooseBetweenCustomTextOrDocument',
  'fields:customURL',
  'fields:chooseDocumentToLink',
  'fields:openInNewTab',
  'fields:enterURL',
  'fields:internalLink',
  'fields:chooseFromExisting',
  'fields:linkType',
  'fields:textToDisplay',
  'fields:collapseAll',
  'fields:editLink',
  'fields:editRelationship',
  'fields:itemsAndMore',
  'fields:labelRelationship',
  'fields:latitude',
  'fields:linkedTo',
  'fields:longitude',
  'fields:passwordsDoNotMatch',
  'fields:removeRelationship',
  'fields:removeUpload',
  'fields:saveChanges',
  'fields:searchForBlock',
  'fields:selectFieldsToEdit',
  'fields:showAll',
  'fields:swapRelationship',
  'fields:swapUpload',
  'fields:toggleBlock',
  'fields:uploadNewLabel',

  'folder:deleteFolder',
  'folder:folderName',
  'folder:moveFolder',
  'folder:newFolder',
  'folder:removeFromFolder',
  'folder:renameFolder',
  'folder:selectFolder',

  'general:all',
  'general:aboutToDeleteCount',
  'general:aboutToDelete',
  'general:addBelow',
  'general:addFilter',
  'general:adminTheme',
  'general:allCollections',
  'general:and',
  'general:anotherUser',
  'general:anotherUserTakenOver',
  'general:applyChanges',
  'general:ascending',
  'general:automatic',
  'general:backToDashboard',
  'general:cancel',
  'general:changesNotSaved',
  'general:close',
  'general:collapse',
  'general:collections',
  'general:columns',
  'general:columnToSort',
  'general:confirm',
  'general:confirmCopy',
  'general:confirmDeletion',
  'general:confirmDuplication',
  'general:confirmReindex',
  'general:confirmReindexAll',
  'general:confirmReindexDescription',
  'general:confirmReindexDescriptionAll',
  'general:copied',
  'general:clearAll',
  'general:copy',
  'general:copyWarning',
  'general:copying',
  'general:create',
  'general:created',
  'general:createdAt',
  'general:createNew',
  'general:createNewLabel',
  'general:creating',
  'general:creatingNewLabel',
  'general:currentlyEditing',
  'general:custom',
  'general:dark',
  'general:dashboard',
  'general:delete',
  'general:deletedSuccessfully',
  'general:deletedCountSuccessfully',
  'general:deleting',
  'general:descending',
  'general:depth',
  'general:deselectAllRows',
  'general:document',
  'general:documentLocked',
  'general:documents',
  'general:duplicate',
  'general:duplicateWithoutSaving',
  'general:edit',
  'general:editAll',
  'general:editing',
  'general:editingLabel',
  'general:editingTakenOver',
  'general:editLabel',
  'general:editedSince',
  'general:email',
  'general:emailAddress',
  'general:enterAValue',
  'general:error',
  'general:errors',
  'general:fallbackToDefaultLocale',
  'general:false',
  'general:filters',
  'general:filterWhere',
  'general:globals',
  'general:goBack',
  'general:isEditing',
  'general:item',
  'general:items',
  'general:language',
  'general:lastModified',
  'general:leaveAnyway',
  'general:leaveWithoutSaving',
  'general:light',
  'general:livePreview',
  'general:loading',
  'general:locale',
  'general:menu',
  'general:moreOptions',
  'general:move',
  'general:moveCount',
  'general:moveDown',
  'general:moveUp',
  'general:moving',
  'general:movingCount',
  'general:next',
  'general:noDateSelected',
  'general:noFiltersSet',
  'general:noLabel',
  'general:none',
  'general:noOptions',
  'general:noResults',
  'general:notFound',
  'general:nothingFound',
  'general:noUpcomingEventsScheduled',
  'general:noValue',
  'general:of',
  'general:open',
  'general:only',
  'general:or',
  'general:order',
  'general:overwriteExistingData',
  'general:pageNotFound',
  'general:password',
  'general:payloadSettings',
  'general:perPage',
  'general:previous',
  'general:reindex',
  'general:reindexingAll',
  'general:remove',
  'general:rename',
  'general:reset',
  'general:resetPreferences',
  'general:resetPreferencesDescription',
  'general:resettingPreferences',
  'general:row',
  'general:rows',
  'general:save',
  'general:schedulePublishFor',
  'general:saving',
  'general:searchBy',
  'general:selectAll',
  'general:selectAllRows',
  'general:selectedCount',
  'general:selectValue',
  'general:showAllLabel',
  'general:sorryNotFound',
  'general:sort',
  'general:sortByLabelDirection',
  'general:stayOnThisPage',
  'general:submissionSuccessful',
  'general:submit',
  'general:submitting',
  'general:success',
  'general:successfullyCreated',
  'general:successfullyDuplicated',
  'general:successfullyReindexed',
  'general:takeOver',
  'general:thisLanguage',
  'general:time',
  'general:timezone',
  'general:titleDeleted',
  'general:true',
  'general:upcomingEvents',
  'general:users',
  'general:user',
  'general:username',
  'general:unauthorized',
  'general:unsavedChanges',
  'general:unsavedChangesDuplicate',
  'general:untitled',
  'general:updatedAt',
  'general:updatedCountSuccessfully',
  'general:updatedSuccessfully',
  'general:updating',
  'general:value',
  'general:viewReadOnly',
  'general:uploading',
  'general:uploadingBulk',
  'general:welcome',

  'localization:localeToPublish',
  'localization:copyToLocale',
  'localization:copyFromTo',
  'localization:selectLocaleToCopy',
  'localization:cannotCopySameLocale',
  'localization:copyFrom',
  'localization:copyTo',

  'operators:equals',
  'operators:exists',
  'operators:isNotIn',
  'operators:isIn',
  'operators:contains',
  'operators:isLike',
  'operators:isNotEqualTo',
  'operators:near',
  'operators:isGreaterThan',
  'operators:isLessThan',
  'operators:isGreaterThanOrEqualTo',
  'operators:isLessThanOrEqualTo',
  'operators:within',
  'operators:intersects',

  'upload:addFile',
  'upload:addFiles',
  'upload:bulkUpload',
  'upload:crop',
  'upload:cropToolDescription',
  'upload:dragAndDrop',
  'upload:editImage',
  'upload:fileToUpload',
  'upload:filesToUpload',
  'upload:focalPoint',
  'upload:focalPointDescription',
  'upload:height',
  'upload:pasteURL',
  'upload:previewSizes',
  'upload:selectCollectionToBrowse',
  'upload:selectFile',
  'upload:setCropArea',
  'upload:setFocalPoint',
  'upload:sizesFor',
  'upload:sizes',
  'upload:width',
  'upload:fileName',
  'upload:fileSize',

  'validation:emailAddress',
  'validation:enterNumber',
  'validation:fieldHasNo',
  'validation:greaterThanMax',
  'validation:invalidInput',
  'validation:invalidSelection',
  'validation:invalidSelections',
  'validation:lessThanMin',
  'validation:limitReached',
  'validation:longerThanMin',
  'validation:notValidDate',
  'validation:required',
  'validation:requiresAtLeast',
  'validation:requiresNoMoreThan',
  'validation:requiresTwoNumbers',
  'validation:shorterThanMax',
  'validation:trueOrFalse',
  'validation:timezoneRequired',
  'validation:username',
  'validation:validUploadID',

  'version:aboutToPublishSelection',
  'version:aboutToRestore',
  'version:aboutToRestoreGlobal',
  'version:aboutToRevertToPublished',
  'version:aboutToUnpublish',
  'version:aboutToUnpublishSelection',
  'version:autosave',
  'version:autosavedSuccessfully',
  'version:autosavedVersion',
  'version:changed',
  'version:changedFieldsCount',
  'version:confirmRevertToSaved',
  'version:compareVersion',
  'version:confirmPublish',
  'version:confirmUnpublish',
  'version:confirmVersionRestoration',
  'version:currentDraft',
  'version:currentPublishedVersion',
  'version:draft',
  'version:draftSavedSuccessfully',
  'version:lastSavedAgo',
  'version:modifiedOnly',
  'version:noFurtherVersionsFound',
  'version:noRowsFound',
  'version:noRowsSelected',
  'version:preview',
  'version:previouslyPublished',
  'version:problemRestoringVersion',
  'version:publish',
  'version:publishAllLocales',
  'version:publishChanges',
  'version:published',
  'version:publishIn',
  'version:publishing',
  'version:restoreAsDraft',
  'version:restoredSuccessfully',
  'version:restoreThisVersion',
  'version:restoring',
  'version:reverting',
  'version:revertToPublished',
  'version:saveDraft',
  'version:scheduledSuccessfully',
  'version:schedulePublish',
  'version:selectLocales',
  'version:selectVersionToCompare',
  'version:showLocales',
  'version:status',
  'version:type',
  'version:unpublish',
  'version:unpublishing',
  'version:versionCreatedOn',
  'version:versionID',
  'version:version',
  'version:versions',
  'version:viewingVersion',
  'version:viewingVersionGlobal',
  'version:viewingVersions',
  'version:viewingVersionsGlobal',
])
