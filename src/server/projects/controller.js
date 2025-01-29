import { projects } from '../../data/projects.js'

export const getProject = (req, res) => {
  const { id } = req.params
  const project = projects.find((p) => p.id === id)

  if (!project) {
    return res.status(404).send('Project not found')
  }

  res.render('projects/project-details.njk', { project })
}

export function getProjects(request, h) {
  return h.view('projects/index', {
    pageTitle: 'Technical Assurance Dashboard',
    projects
  })
}

export function getProjectDetails(request, h) {
  const project = projects.find((p) => p.id === request.params.id)

  if (!project) {
    return h.view('404').code(404)
  }

  return h.view('projects/project-details', {
    pageTitle: project.name,
    project
  })
}
