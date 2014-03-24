package com.gapelia.core.auth;

import com.gapelia.core.database.QueryDatabaseUser;
import org.apache.log4j.Logger;
import org.brickred.socialauth.*;
import org.brickred.socialauth.util.BirthDate;
import org.brickred.socialauth.util.SocialAuthUtil;

import javax.servlet.ServletException;
import javax.servlet.http.*;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import org.apache.http.client.ResponseHandler;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.BasicResponseHandler;
import org.apache.http.impl.client.DefaultHttpClient;
import org.json.JSONArray;
import org.json.JSONObject;

public class AuthSuccessHandler extends HttpServlet {
	public static Logger LOG = Logger.getLogger(AuthSuccessHandler.class);
	private static final long serialVersionUID = 1L;
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		try {
			HttpSession session = null;
			for(Cookie c : request.getCookies()){
				LOG.info(c.getName() + c.getValue());
				if(c.getName().equals("JSESSIONID"))
					session = SessionManager.find(c.getValue());
			}

			SocialAuthManager manager = (SocialAuthManager)session.getAttribute("authManager");
			Profile profile = null;
			Map requestMap = SocialAuthUtil.getRequestParametersMap(request);
			AuthProvider provider;
			try{
				provider = manager.connect(requestMap);
			}catch(Exception e ){
				LOG.warn("user trying to log in with other social media account...redirecting." + e.getMessage());
				response.sendRedirect("/");
				return;
			}
			profile = provider.getUserProfile();

			if(provider.getProviderId().equals(AuthHelper.APP_GOOGLE))
			{
				Map<String,String> gPlusResponse = get(provider.getAccessGrant().getKey());
				if(gPlusResponse.containsKey("dob")){
					String[] dobSplit = gPlusResponse.get("dob").split("-");
					BirthDate bd = new BirthDate();
					for(int i = 1 ; i <= 3 ; i++){
						if(i == 1)
							bd.setYear(Integer.parseInt(dobSplit[i-1]));
						else if(i == 2)
							bd.setMonth(Integer.parseInt(dobSplit[i - 1]));
						else if(i == 3)
							bd.setDay(Integer.parseInt(dobSplit[i - 1]));
					}

					profile.setDob(bd);

				}
				if(gPlusResponse.containsKey("location")){
					LOG.info("setting locaiton to " + gPlusResponse.get("location"));
					profile.setLocation(gPlusResponse.get("location"));
				}

			}

			session.setAttribute("login", "true");
			session.setAttribute("profile", profile);
			Cookie sessionCookie = new Cookie("JSESSIONID", session.getId());
			LOG.info("AUTH SUCCESS JSESSION:"+session.getId());
			sessionCookie.setMaxAge(31557600);
			response.addCookie(sessionCookie);
			String answer = QueryDatabaseUser.checkUser(profile, session.getId());
			LOG.info("Answer is :" + answer);
			if (answer =="Success") {
				response.sendRedirect("/me");
				return;
			} else if(answer == "New") {
				response.sendRedirect("/onboard");
			}
		} catch (Exception e) {
			throw new ServletException(e);
		}
	}


	public Map<String,String> get(String accessToken)
	{
		HttpClient httpclient = new DefaultHttpClient();

		Map<String,String> resultMap=null;
		try {
			HttpGet httpget = new HttpGet("https://www.googleapis.com/plus/v1/people/me?access_token="+accessToken);
			resultMap = new HashMap<String,String>();
			// Create a response handler
			ResponseHandler<String> responseHandler = new BasicResponseHandler();
			// Body contains your json stirng
			String responseBody = httpclient.execute(httpget, responseHandler);

			JSONObject json = new JSONObject(responseBody);
			LOG.info(json.toString());
			if(json.has("birthday"))
				resultMap.put("dob",(String)json.get("birthday"));
			if(json.has("placesLived")){
				JSONArray jarray = (JSONArray)json.get("placesLived");
				for(int i = 0 ; i < jarray.length() ; i ++)
				{
					JSONObject locationJson = (JSONObject)jarray.get(i);
					LOG.info("LOCATION JSON" + locationJson.toString());
					if(locationJson.getBoolean("primary")){
						LOG.info("location json detected as primary.");
						resultMap.put("location",(String)locationJson.get("value"));
						break;
					}
				}

			}

			LOG.info(responseBody);

		} catch (Exception e) {
			LOG.error(e.getMessage());
		} finally {
			// When HttpClient instance is no longer needed,
			// shut down the connection manager to ensure
			// immediate deallocation of all system resources
			httpclient.getConnectionManager().shutdown();
		}
		return resultMap;
	}
}