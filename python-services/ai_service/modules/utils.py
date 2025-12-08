from dotenv import load_dotenv
import logging
import os


load_dotenv()


logging.basicConfig(level=os.getenv('LOG_LEVEL', 'INFO'))
logger = logging.getLogger('skillbridge')