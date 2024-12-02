import { useEffect, useState } from 'react';
import { axiosInstance, PROJECTS_URLS } from '../../../../api';
import { formatDate } from '../../../../helpers';
import { toast } from 'react-toastify';
import { ProjectsType } from '../../../../interface/Projects/Projects';
import TableHeader from '../../../shared/components/TableHeader/TableHeader';
import TableActions from '../../../shared/components/TableActions/TableActions';

const ProjectsList = () => {
	const [projectsData, setProjectsData] = useState([]);
	const [loading, setLoading] = useState<boolean>(false);

	const getProjects = async () => {
		try {
			setLoading(true);
			const response = await axiosInstance.get(
				`${PROJECTS_URLS.list}?pageSize=10&pageNumber=1`
			);
			setProjectsData(response.data.data);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getProjects();
	}, []);

	const handleDelete = async () => {
		try {
			// setIsLoading(true);
			const response = await axiosInstance.delete(
				PROJECTS_URLS.deleteProject(id)
			);
			// setShowDelete(false);
			getProjects();
			toast.success('Category deleted successfully');
			// setIsLoading(false);
		} catch (error) {
			toast.error("Can't delete this category");
		}
	};

	const projectsList = projectsData?.map((project: ProjectsType) => (
		<tr key={project.id}>
			<td className='table-data'>{project.title}</td>
			<td className='table-data'>{project.description}</td>
			<td className='table-data'>{project.task.length}</td>
			<td className='table-data'>{formatDate(project.creationDate)}</td>
			<td className='table-data'>
      </td>
		</tr>
	));

	return (
		<div className='pt-5 w-100 ms-5 me-2 mx-auto'>
      <TableHeader title='Projects' btnTitle='Add New Project' url='new-project' />
			{loading ? (
				<div className='d-flex justify-content-center'>
					<div className='spinner-border text-warning' role='status'>
						<span className='visually-hidden'>Loading...</span>
					</div>
				</div>
			) : (
				<div className='table-responsive'>
					<table className='table table-striped table-borderless'>
						<thead>
							<tr>
								<th className='table-header'>Title</th>
								<th className='table-header'>Description</th>
								<th className='table-header'>Num Tasks</th>
								<th className='table-header'>Date Created</th>
								<th className='table-header'></th>
							</tr>
						</thead>
						<tbody>{projectsList}</tbody>
					</table>
				</div>
			)}
		</div>
	);
};

export default ProjectsList;
