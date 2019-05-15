package foundation.shedule;

import java.util.Date;

import org.apache.log4j.Logger;


public class EAIJob extends Job {

	private static Logger logger;
	
	static {
		logger = Logger.getLogger(EAIJob.class);
	}
	
	@Override
	protected void doExecute() throws Exception {
		logger.debug("开始自动执行");
		Engine engine = Engine.getInstance();
		engine.exec("createTransflow");
	}
	
	@Override
	public void begin(String taskId, Date beginTime) {
		logger.debug("-------------定时任务开始，taskId：" + taskId + "-----------");
	}

	@Override
	public void succeed(String taskId, int tryTimes, int tryCycles, Date endTime) {
		logger.debug("--------------------succeed-------------------");
	}

	@Override
	public void fail(String taskId, int tryTimes, int tryCycles, Date endTime) {
		logger.debug("--------------------fail-------------------");
	}

}