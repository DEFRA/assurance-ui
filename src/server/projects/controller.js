/**
 * Project details controller
 * @satisfies {Partial<ServerRoute>}
 */
export const projectController = {
  handler: (request, h) => {
    const projects = {
      'cdp-platform': {
        name: 'CDP Platform',
        status: 'GREEN',
        lastUpdated: '15 March 2024',
        commentary: 'Platform demonstrates excellent alignment with GDS standards, with strong focus on user needs and open development practices.',
        standards: [
          {
            number: 1,
            name: 'Understand users and their needs',
            status: 'GREEN',
            commentary: 'Extensive user research with service teams and clear understanding of developer needs'
          },
          {
            number: 2,
            name: 'Solve a whole problem for users',
            status: 'GREEN',
            commentary: 'Platform provides end-to-end solution for service deployment and management'
          },
          {
            number: 3,
            name: 'Provide a joined up experience across all channels',
            status: 'GREEN',
            commentary: 'Consistent experience across CLI, web interface and documentation'
          },
          {
            number: 4,
            name: 'Make the service simple to use',
            status: 'GREEN',
            commentary: 'Intuitive interfaces and automated processes reduce complexity'
          },
          {
            number: 5,
            name: 'Make sure everyone can use the service',
            status: 'GREEN',
            commentary: 'Platform is accessible and well-documented for all skill levels'
          },
          {
            number: 6,
            name: 'Have a multidisciplinary team',
            status: 'GREEN',
            commentary: 'Team includes developers, ops, user researchers, and content designers'
          },
          {
            number: 7,
            name: 'Use agile ways of working',
            status: 'GREEN',
            commentary: 'Team works in sprints with regular demos and feedback cycles'
          },
          {
            number: 8,
            name: 'Iterate and improve frequently',
            status: 'GREEN',
            commentary: 'Regular releases and continuous improvement based on feedback'
          },
          {
            number: 9,
            name: 'Create a secure service which protects users\' privacy',
            status: 'GREEN',
            commentary: 'Strong security controls and privacy-by-design approach'
          },
          {
            number: 10,
            name: 'Define what success looks like and publish performance data',
            status: 'GREEN',
            commentary: 'Clear metrics and public dashboard showing platform performance'
          },
          {
            number: 11,
            name: 'Choose the right tools and technology',
            status: 'GREEN',
            commentary: 'Well-considered technology choices aligned with GDS recommendations'
          },
          {
            number: 12,
            name: 'Make new source code open',
            status: 'GREEN',
            commentary: 'All components open source and published on GitHub'
          },
          {
            number: 13,
            name: 'Use and contribute to open standards, common components and patterns',
            status: 'GREEN',
            commentary: 'Actively contributes to and uses GDS patterns and components'
          },
          {
            number: 14,
            name: 'Operate a reliable service',
            status: 'GREEN',
            commentary: 'High availability and robust operational procedures'
          }
        ]
      },
      'elm-payment-services': {
        name: 'ELM Payment Services',
        status: 'RED',
        lastUpdated: '10 March 2024',
        commentary: 'Service requires significant improvements to meet GDS standards. Major concerns around security, reliability and user research.',
        standards: [
          {
            number: 1,
            name: 'Understand users and their needs',
            status: 'RED',
            commentary: 'Limited user research conducted, needs more engagement with farmers'
          },
          {
            number: 2,
            name: 'Solve a whole problem for users',
            status: 'AMBER',
            commentary: 'Gaps in payment journey, particularly around payment status tracking'
          },
          {
            number: 3,
            name: 'Provide a joined up experience across all channels',
            status: 'RED',
            commentary: 'Inconsistent experience between digital and paper channels'
          },
          {
            number: 4,
            name: 'Make the service simple to use',
            status: 'RED',
            commentary: 'Complex processes and technical language creating barriers'
          },
          {
            number: 5,
            name: 'Make sure everyone can use the service',
            status: 'RED',
            commentary: 'Accessibility issues identified, needs comprehensive review'
          },
          {
            number: 6,
            name: 'Have a multidisciplinary team',
            status: 'AMBER',
            commentary: 'Key roles missing, particularly user researchers'
          },
          {
            number: 7,
            name: 'Use agile ways of working',
            status: 'RED',
            commentary: 'Waterfall approach being used, limited iteration'
          },
          {
            number: 8,
            name: 'Iterate and improve frequently',
            status: 'RED',
            commentary: 'Infrequent releases and limited feedback loops'
          },
          {
            number: 9,
            name: 'Create a secure service which protects users\' privacy',
            status: 'RED',
            commentary: 'Security vulnerabilities identified in recent audit'
          },
          {
            number: 10,
            name: 'Define what success looks like and publish performance data',
            status: 'RED',
            commentary: 'No clear metrics or performance monitoring'
          },
          {
            number: 11,
            name: 'Choose the right tools and technology',
            status: 'AMBER',
            commentary: 'Some legacy technology choices need review'
          },
          {
            number: 12,
            name: 'Make new source code open',
            status: 'RED',
            commentary: 'Code base currently closed source with no plan to open'
          },
          {
            number: 13,
            name: 'Use and contribute to open standards, common components and patterns',
            status: 'RED',
            commentary: 'Limited use of GDS patterns and components'
          },
          {
            number: 14,
            name: 'Operate a reliable service',
            status: 'RED',
            commentary: 'Frequent outages and no proper monitoring'
          }
        ]
      }
    }

    const project = projects[request.params.id]
    if (!project) {
      return h.redirect('/')
    }

    return h.view('projects/details', {
      pageTitle: `${project.name} - Technical Assessment`,
      heading: project.name,
      project
    })
  }
} 