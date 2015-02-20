# encoding utf-8

import json
import os

templates = {
	'class': '''
class _{0} extends XML
  constructor: (args...) ->
    super "{1}", args...''',

    'function': '''
{0} = (args...)->
  new _{0} args...'''
}

targetFile = '../../src/koala-html.coffee'

try:
	json_data = file('tags.json')
	tags = json.load(json_data)
	render_list = []

	for tag in tags['tags']:
		_selfclose = tag.endswith('/')
		if _selfclose:
			tag = tag[:-1]
		render_list.append(templates['class'].format(
			tag.upper(),
			'{}{}'.format(
				tag,
				'/' if _selfclose is True else '')))
		render_list.append(templates['function'].format(tag.upper()))

	with open(targetFile, "a") as source_file:
		source_file.write(
			'\n'.join(render_list))
		source_file.close()
except Exception, e:
	print e