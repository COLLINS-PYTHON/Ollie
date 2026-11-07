require 'xcodeproj'
project = Xcodeproj::Project.open('ios/App/App.xcodeproj')
target = project.targets.find { |t| t.name == 'App' }
raise 'Missing App target' unless target
app_group = project.main_group.find_subpath('App', false)
raise 'Missing App group' unless app_group
reference = app_group.files.find { |f| f.path == 'PrivacyInfo.xcprivacy' } || app_group.new_file('PrivacyInfo.xcprivacy')
target.resources_build_phase.add_file_reference(reference, true)
target.build_configurations.each do |config|
 config.build_settings['CODE_SIGN_ENTITLEMENTS'] = 'App/App.entitlements'
 config.build_settings['TARGETED_DEVICE_FAMILY'] = '1,2'
 config.build_settings['IPHONEOS_DEPLOYMENT_TARGET'] = '15.0'
 config.build_settings['SUPPORTS_MACCATALYST'] = 'NO'
end
project.save
