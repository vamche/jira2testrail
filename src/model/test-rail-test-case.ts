import {JiraTicket} from './jira-ticket'

export class TestRailTestCase {
    title = ''

    pre_conditions = ''

    section_name = ''

    section_desc = ''

    steps = ''

    expected_result = ''

    references = ''

    /**
   * Creates a TestRailTestCase object
   * @param {JiraTicket} obj Base object to use
   */
    constructor(obj: JiraTicket) {
      this.title = obj.test_case_title
      this.pre_conditions = this.convertToTestRailTable(obj.pre_conditions)
      this.section_name = obj.section_name
      this.section_desc = obj.section_description
      this.steps = this.convertToTestRailTable(obj.steps)
      this.expected_result = obj.expected_results
      this.references = obj.ticket_id
    }

    convertToTestRailTable(htmlString: string) {
      return htmlString.replace(/(<tr>\n<th class='confluenceTh'>(.+)<\/th>)/g, '|||: $2')
      .replace(/(\n<th class='confluenceTh'>(.+)<\/th>)/g, '|: $2')
      .replace(/(<tr>\n<td class='confluenceTd'>(.+)<\/td>)/g, '|| $2')
      .replace(/(\n<td class='confluenceTd'>(.+)<\/td>)/g, '| $2')
      .replace(/(<div.+>|<table.+>|<\/div>|<\/table>|<\/tbody>|<\/tr>)/g, '')
    }
}
