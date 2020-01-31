import {Command, flags} from '@oclif/command'
import * as fs from 'fs-extra'
import * as xml2js  from 'xml2js'
import {Parser as CsvParser} from 'json2csv'
import * as path from 'path'

import {JiraTicket} from './model/jira-ticket'
import {TestRailTestCase} from './model/test-rail-test-case'

class Jira2Testrail extends Command {
  static description = `converts the given Jira ticket xml to a csv file which can imported in TestRail
  Usage: j2t <input-jira-ticket-file-path> <output-test-rail-csv-path>
  `

  static flags = {
    // add --version flag to show CLI version
    version: flags.version({char: 'v'}),
    help: flags.help({char: 'h'}),
  }

  static args = [{name: 'file'}, {name: 'csv'}]

  async run() {
    const {args} = this.parse(Jira2Testrail)
    if (!args.file) {
      this.error('JIRA xml path is necessary')
    }

    const fields = [
      'title',
      'pre_conditions',
      'section_name',
      'section_desc',
      'steps',
      'expected_result',
      'references',
    ]

    const jsonParser = new xml2js.Parser()
    const jiraXml = await fs.readFile(args.file)
    const json = await jsonParser.parseStringPromise(jiraXml)
    const jiraTicket = new JiraTicket(json.rss.channel[0].item[0])
    const csvParser = new CsvParser({fields})

    const testRailCsvData = csvParser.parse(new TestRailTestCase(jiraTicket))
    const outputFileName = args.csv || path.join(process.cwd(), 'testRailTicket.csv')
    fs.writeFileSync(outputFileName, testRailCsvData)
    this.log('TestRail CSV ouput can be found at: ', outputFileName)
  }
}

export = Jira2Testrail
