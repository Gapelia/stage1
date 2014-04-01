package com.gapelia.core.auth;

import com.gapelia.core.database.DatabaseManager;
import com.gapelia.core.database.QueryDatabaseUser;
import com.gapelia.core.model.User;
import org.apache.http.client.HttpClient;
import org.apache.http.client.ResponseHandler;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.BasicResponseHandler;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.log4j.Logger;
import org.brickred.socialauth.AuthProvider;
import org.brickred.socialauth.Profile;
import org.brickred.socialauth.SocialAuthManager;
import org.brickred.socialauth.util.BirthDate;
import org.brickred.socialauth.util.SocialAuthUtil;
import org.json.JSONArray;
import org.json.JSONObject;

import javax.servlet.ServletException;
import javax.servlet.http.*;
import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

public class UserProfileCheck extends HttpServlet {
	public static Logger LOG = Logger.getLogger(UserProfileCheck.class);
	private static final long serialVersionUID = 1L;
	private static Connection connection = DatabaseManager.getInstance().getConnection();
	private static final String CHECK_USER = "SELECT * FROM users WHERE LOWER(display_name) = ?";

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		try {
			HttpSession session = null;

			String attempted = request.getAttribute("javax.servlet.error.request_uri").toString().replace("/","").toLowerCase();

			PreparedStatement statement = null;
			ResultSet rs = null;
			try {
				statement = connection.prepareStatement(CHECK_USER);
				statement.setString(1, attempted);
				rs = statement.executeQuery();
				if (!rs.isBeforeFirst()) {
					response.sendRedirect("/error/404.jsp");
				} else {
					rs.next();
					User u = QueryDatabaseUser.getUserByValidatedId(rs.getString("validated_id"));
					LOG.info(u.getAvatarImage());

					response.sendRedirect(response.encodeRedirectURL("/user.jsp?id=" + u.getUserId()));
				}
			} catch (SQLException ex) {
				LOG.error("Cannot check user u:" + attempted + " " + ex.getMessage());
			} finally {
				try {
					if (rs != null) {
						rs.close();
					}
					if (statement != null) {
						statement.close();
					}
				} catch (SQLException ex) {
					LOG.error("Error closing connection " + attempted + " " + ex.getMessage());
				}
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