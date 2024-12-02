import { useForm } from "react-hook-form";
import AddFormHeader from "../../../shared/components/AddFormHeader/AddFormHeader";
import style from './ProjectForm.module.css'
import { Link, useNavigate, useParams } from "react-router-dom";
import { AddProjectPayload } from "../../../../interface/Add&EditResponse/Add&EditResponse";
import { toast } from "react-toastify";
import { axiosInstance, HEADERS, PROJECTS_URLS } from "../../../../api";
import { useEffect } from "react";

const ProjectForm = () => {
  const {register,formState:{errors ,isSubmitting},setValue,handleSubmit} = useForm<AddProjectPayload>({mode:'onChange'});
  const navigate = useNavigate();
  const {projectId} = useParams<{projectId:string}>()
  const isNewProject:boolean = !projectId


  const onSubmit = async(data:AddProjectPayload)=>{
    const parsedId = parseInt(projectId!, 10);
    try {
      await axiosInstance[isNewProject?'post':'put'](isNewProject?PROJECTS_URLS.ADD_PROJECT:PROJECTS_URLS.EDIT_PROJECT(parsedId),data,HEADERS)
      // isNewProject ? toast.success("Project added successfully") : toast.success("Project updated successfully");
      navigate('/projects')
    } catch (error:any) {
      toast.error(error?.response?.data?.message);

    }
  }

  useEffect(()=>{
     
    if(!isNewProject){
      const parsedId = parseInt(projectId!, 10);
        const getProject = async()=>{
            const response = await axiosInstance.get(PROJECTS_URLS.GET_PROJECT(parsedId),HEADERS)
            console.log(response)
            setValue('title',response?.data?.title)
            setValue('description',response?.data?.description)
        }
        getProject()
    }
},[])



  return <div className={style['add-project-wrapper']}>
    <AddFormHeader  title='Project' link="Projects"/>
    <form className={style['form-wrapper']} onSubmit={handleSubmit(onSubmit)}>
            {/*title */}
                <div className={style["input-group"]}>
                  <label>Title</label>
                  <input 
                    type="text" 
                    className={style["form-input"] }
                    placeholder="Name" 
                    aria-label="title" 
                    aria-describedby="basic-addon1"
                    {...register('title',{
                        required:'project titel is required'
                    })}
                    />
                </div>
                {errors.title&&<span className='text-danger '>{errors.title.message}</span>}
                {/*description */}
                <div className={style["input-group"]}>
                  <label>Description</label>
                  <input 
                    type="text" 
                    className={style["form-input"]}
                    placeholder="Description" 
                    aria-label="title" 
                    aria-describedby="basic-addon1"
                    {...register('description',{
                        required:'project description is required'
                    })}
                    />
                </div>
                {errors.description&&<span className='text-danger '>{errors.description.message}</span>}



                <div className={style['btns-wrapper']}>
                    <Link to='/projects' className={style['cancle-btn']}>Cancle</Link>
                    <button disabled={isSubmitting} type='submit' className={style['save-btn']}>
                        {isSubmitting?'...Loading':'Save'}
                    </button>
                </div>
        </form>
  </div>;
};

export default ProjectForm;
