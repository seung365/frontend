import {
  Activity,
  Education,
  Experience,
  Language,
  Project,
  ResponseSkills,
  ResumeResponse,
} from '../types'

const resumeTransform = (resumeData: ResumeResponse) => {
  return {
    information: {
      id: resumeData.information?.id || 0,
      name: resumeData.information?.name || '',
      position: resumeData.information?.position || '',
      summary: resumeData.information?.summary || '',
      portfolio: resumeData.information?.portfolio || '',
      employmentPeriod: resumeData.information?.employmentPeriod || '신입',
    },
    skills: resumeData.skills?.map((skill: ResponseSkills) => skill.name) || [],
    experiences: resumeData.experiences?.map((exp: Experience) => ({
      ...(exp.id && { id: exp.id }),
      companyName: exp.companyName || '',
      position: exp.position || '',
      startDate: exp.startDate || '',
      endDate: exp.endDate || '',
      description: exp.description || '',
    })) || [
      {
        companyName: '',
        position: '',
        startDate: '',
        endDate: '',
        description: '',
      },
    ],
    projects: resumeData.projects?.map((proj: Project) => ({
      name: proj.name || '',
      description: proj.description || '',
      organization: proj.organization || '',
      startDate: proj.startDate || '',
      endDate: proj.endDate || '',
      link: '',
    })) || [
      {
        name: '',
        description: '',
        organization: '',
        startDate: '',
        endDate: '',
        link: '',
      },
    ],
    activities: resumeData.activities?.map((act: Activity) => ({
      activityName: act.activityName || '',
      organization: act.organization || '',
      startDate: act.startDate || '',
      endDate: act.endDate || '',
      description: act.description || '',
    })) || [
      {
        activityName: '',
        organization: '',
        startDate: '',
        endDate: '',
        description: '',
      },
    ],
    educations: resumeData.educations?.map((edu: Education) => ({
      organization: edu.organization || '',
      degree: edu.degree || '',
      major: edu.major || '',
      startDate: edu.startDate || '',
      endDate: edu.endDate || '',
      status: edu.status || '',
    })) || [
      {
        organization: '',
        degree: '',
        major: '',
        startDate: '',
        endDate: '',
        status: '',
      },
    ],
    languages: resumeData.languages?.map((lang: Language) => ({
      name: lang.name || '',
      level: lang.level || '',
    })) || [
      {
        name: '',
        level: '',
      },
    ],
  }
}

export default resumeTransform
