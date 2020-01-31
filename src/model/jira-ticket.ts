export class JiraTicket {
    title = ''

    description: Array<string> = []

    link = ''

    ticket_id = ''

    /**
     * Creates a JiraTicket object
     * @param {any} obj Base object to use
     */
    constructor(obj: any = {}) {
      obj.description = obj.description[0].split(/(?=<h3)/)
      obj.ticket_id = obj.key[0]._
      Object.assign(this, obj)
    }

    get pre_conditions() {
      return this.removeHeaderFromHTML(this.description.find(content => content.indexOf('name="Preconditions"') > -1) ?? '')
    }

    get steps() {
      return this.removeHeaderFromHTML(this.description.find(content => content.indexOf('name="Steps"') > -1) ?? '')
    }

    get expected_results() {
      return this.removeHeaderFromHTML(this.description.find(content => content.indexOf('name="BusinessGoal"') > -1) ?? '')
    }

    get test_case_title() {
      return this.removeHeaderFromHTML(this.description.find(content => content.indexOf('name="BusinessGoal"') > -1) ?? '')
    }

    get section_name() {
      return this.title[0]
    }

    get section_description() {
      return this.link[0]
    }

    removeHeaderFromHTML(htmlString: string) {
      return htmlString.replace(/(<h3.+>)/, '')
    }
}
